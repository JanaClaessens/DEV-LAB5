// require Message model
const Message = require("../models/message");

async function getAll(req, res){
    let user = req.query.user

    let messages;
    if(!user){
        // code als er geen user is
        // vraag ALLE messages op
        messages = await Message.find();
    }else{
        // code als er wel een user is
        messages = await Message.find({
            user: user
        })
    }
    
    let response = {
        status: "success",
        data: {
            messages: messages
        }
    }
    res.json(response)
}

async function getById(req, res){
    let id = req.params.id

    try {
        let message = await Message.findById(id);

        if(!message){
            // 404 = status code voor Not Found
            res.status(404).json({
                status: "error",
                message: "Message niet gevonden"
            })
            return
        }

        res.json({
            status: "success",
            data: {
                message: message
            }
        })
    }catch(err){
        // Toon error message
        // Zet status code naar 400 dat betekent algemene fout door de client
        res.status(400).json({
            status: "error",
            message: err.message
        })
        return
    }
}

async function create(req, res){
    // Nieuw message object mkaen
    let message = new Message();

    // Set message velden
    let bodyMessage = req.body.message
    message.user = bodyMessage.user;
    message.message = bodyMessage.text;
    
    // Message opslaan
    try {
        let savedMessage = await message.save()
        let response = {
            status: "success",
            data: savedMessage
        }
        res.json(response)
    }catch(err){
        let response = {
            status : "error",
            message :  "Error creating message: " + err.message
        }
        // Zet status code naar 400 dat betekent algemene fout door de client
        res.status(400).json(response);
    }
}

async function deleteById(req, res) {
    let messageId = req.params.id;
    try {
        let result = await Message.deleteOne({ _id: messageId });
        let response = {
            status: "success",
            data: result
        }
        res.json(response);
    }catch(err){
        let response = {
            status : "error",
            message :  "Error deleting message: " + err.message
        }
        // Zet status code naar 400 dat betekent algemene fout door de client
        res.status(400).json(response);
    }
}

async function updateById(req, res){
    let messageId = req.params.id;
    // als er geen message meegegeven werd, een leeg object geven ipv undefined
    // om error op te lossen
    let bodyMessage = req.body.message || {}

    try{
        // Rename .text naar .message voor screenshots te laten kloppen
        let newMessage = {
            user: bodyMessage.user,
            message: bodyMessage.text
        }
        let result = await Message.findByIdAndUpdate(messageId, newMessage)
        let response = {
            status : "success",
            data: result
        }
        res.json(response);
    }catch(err){
        let response = {
            status : "error",
            message : "Error updating message: " + err.message
        }
        // Zet status code naar 400 dat betekent algemene fout door de client
        res.status(400).json(response);
    }
}

// Maak beschikbaar als je deze module importeert
module.exports.getAll = getAll
module.exports.getById = getById
module.exports.deleteById = deleteById
module.exports.updateById = updateById
module.exports.create = create