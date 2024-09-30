const messageModel = require('../Models/messageModel');

const createMessage = async (req,res) => {
    const {chatId, senderId, text} = req.body;

    message = new messageModel({chatId, senderId, text});

    try{
        const response = await message.save();
        
        return res.status(200).json(response);
    }
    catch(error){
        return res.status(500).json(error);
    }
}


const findMessage = async (req, res) => {
        const {chatId} = req.params;
    try {
        const message = await messageModel.find({chatId});

        if(!message){
            return res.status(404).json('No message found!')
        }
            
        return res.status(200).json(message);
    } 
    catch (error) {
        return res.status(500).json(error);
    }
};



module.exports = {createMessage,findMessage};

