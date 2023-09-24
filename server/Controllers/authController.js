const User = require('../models/User')
const { hashPassword, comparePassword } = require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working')
}

//Register endpoint
const registerUser = async (req, res) => {
    try {
        //get the requested body
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password || password.length < 6) {
            return res.json({
                error: "Invalid input. Name, email, and a password with at least 6 characters are required."
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                error: "Email already exists."
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
};

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: "No user found."
            });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await comparePassword(password, user.password);

        if (passwordMatch) {
            return res.json('Password matches');
        } else {
            return res.json({
                error: "Password does not match."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
};

module.exports = { test, registerUser, loginUser }