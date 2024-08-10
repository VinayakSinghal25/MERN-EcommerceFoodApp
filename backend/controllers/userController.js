const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const registerUser = async (req, res) => {
    let { email, name, password } = req.body;

    // Check if the user already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new UserModel({ name: name, email: email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create a JSON Web Token
    const token = jwt.sign({ userId: savedUser._id }, "55678");

    return res.status(201).json({ user: newUser, token });
};

const loginUser = async (req, res) => {
    let { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Password does not match" });
    }

    // Create a JSON Web Token
    const token = jwt.sign({ userId: user._id }, "55678");

    return res.status(200).json({ user: user, token });
};

module.exports = { registerUser, loginUser };
