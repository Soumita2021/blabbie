const chatModel = require('../Models/chatModel');

const createChat = async (req,res) => {
    try{
        const {firstId, secondId} = req.body;

        let chat = await chatModel.findOne({ members: {$all : [firstId,secondId]}  });

        if(chat)
            return res.status(200).json(chat);

        chat = new chatModel({members: [firstId,secondId]});
        const response = await chat.save();
        
        return res.status(200).json(response);

    }
    catch(error){
        return res.status(500),json(error);
    }
}


const findUserChats = async (req, res) => {
    try {
        const userId = req.params.userId;

        let chats = await chatModel.find({
            members : {$in: [userId]}
        });

        if (!chats) {
            return res.status(404).json('No chat found.');
        }

        return res.status(200).json(chats);
    } 
    catch (error) {
        return res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    try {
        const {firstId,secondId} = req.params;

        let chat = await chatModel.findOne({
            members : {$all: [firstId,secondId]}
        });

        if (!chat) {
            return res.status(404).json('No chat found.');
        }

        return res.status(200).json(chat);
    } 
    catch (error) {
        return res.status(500).json(error);
    }
};



module.exports = {createChat,findUserChats,findChat};

