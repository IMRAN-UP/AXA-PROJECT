const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    const { first_name, last_name, birthday, gender, email, phone_number, password } = req.body;

    if (!first_name || !last_name || !birthday || !gender || !email || !phone_number || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone_number }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        const newUser = new User({ first_name, last_name, birthday, gender, email, phone_number, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(400).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, loginUser };
