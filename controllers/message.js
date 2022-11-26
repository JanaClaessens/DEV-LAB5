// require Message model
const Message = require("../models/message");

async function getAll(req, res){
    let messages = await Message.find();
    let response = {
        status: "success",
        data: {
            messages: messages
        }
    }
    res.json(response)
}

function create(req, res){
    let message = new Message();
    message.user = req.body.user;
    message.message = req.body.message;
    
    message.save((err, savedMessage) => {
        if (err){
            console.log(err, savedMessage);
            console.log(req.body)
            let response = {
                status : "error",
                message : "Error creating message"
            }
            res.json(response);
            return
        }
        // if no err, send back saved message
        let response = {
            status: "success",
            data: savedMessage
        }
        res.json(response)
    })
}

module.exports.getAll = getAll
module.exports.create = create