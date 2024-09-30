const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtKey, { expiresIn: '3d' });
};


const registerUser = async (req,res) => {
    try{
        const {name,gender,email,password} = req.body;

        let user = await userModel.findOne({ email: email });

        if(user)
            return res.status(404).json('This email is already exists.');

        if(!name || !gender || !email || !password) 
            return res.status(404).json('Please fill all fields name, email, password.');

        if(!validator.isEmail(email)) 
            return res.status(404).json('Please enter valid email');

        if(!validator.isStrongPassword(password)) 
            return res.status(404).json('Please enter a strong password');

        user = new userModel({name,gender,email,password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save();

        const token = createToken(user._id);
        return res.status(200).json({_id:user._id,name,email,token});

    }
    catch(error){
        return res.status(500),json('Server error'.error);
    }
}

const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;

        let user = await userModel.findOne({ email: email });

        if(!user)
            return res.status(404).json('This user is not registered yet.');

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword) return res.status(404),json("Password is incorrect");

        const token = createToken(user._id);
        return res.status(200).json({_id:user._id,name:user.name,email,token});

    }
    catch(error){
        return res.status(500).json(error);
    }
}

const findUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json('User not found.');
        }

        return res.status(200).json(user);
    } 
    catch (error) {
        console.error('Error during user search:', error);
        return res.status(500).json('Server error');
    }
};

const getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};



module.exports = {registerUser,loginUser,findUser,getUser};

