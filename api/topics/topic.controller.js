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
};
