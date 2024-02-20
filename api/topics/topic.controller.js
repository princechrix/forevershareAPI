const { json } = require("express");
const { createTopic, getTopics } = require("./topic.service");

module.exports = {
  addTopic: (req, res) => {
    const data = req.body;

    createTopic(data, (err, result)=> {
        if(err) {
            res.status(500).json({
                success: false,
                message: "Failed to add Topic"
            })
        } 
        
        return res.status(200).json({
            success: true,
            message: "Topic was added!"
        })
    })
  },
  topics: (req, res) => {
    getTopics((err, results) => {
      if(err) {
        return res.status(500).json({
          success: false, 
          message: "Failed to Fetch Topics"
        })
      } 

      if(results[0] != null) {
        return res.status(200).json({
          success: true, 
          data: results
        })
      } else {
        return res.status(200).json({
          success: true, 
          data: "No Topics Available now!"
        })
      }


    })
  }
};
