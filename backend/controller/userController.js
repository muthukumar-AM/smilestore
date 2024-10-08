const User=require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Signup=async(req,res)=>{
    console.log("user");
    const {username,email,password}=req.body;

    try{
        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const Signin=async(req,res)=>{
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log("Hello");
        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            'your_jwt_secret', // Secret key (should be stored securely, e.g., in an environment variable)
            { expiresIn: '1h' } // Token expiry time
        );

        // Send the token as a response
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={
    Signup,
    Signin
}