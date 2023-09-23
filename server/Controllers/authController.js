const User = require('../models/User')
const { hashPassword, comparePassword } = require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try{
        //check what should be requested from the body
        const {name, email, password} = req.body;
        //check if the name was enstered
        if(!name) {
            return res.json({
                error: "Name is required"
            })
        }
        //check password
        if(!password || password.length < 6) {
            return res.json({
                error: "Password is required and should not be less than 6 characters"
            })
        }
        //check if the email already exist
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: "Email aready exist"
            })
        }

        const hashedPassword = await hashPassword(password);
        //create user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user);

    }catch (error) {
        console.log(error)
    }

}

module.exports = { test, registerUser }