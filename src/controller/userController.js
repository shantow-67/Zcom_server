const UserModel = require("../models/UsersModel");
const OTPModel = require("../models/OTPModel");
const bcrypt = require("bcrypt");
const { EncodeToken } = require("../util/TokenHelper");
const sendEmailUtility = require("../util/sendEmailUtility");

// user Registration process
exports.Registration = async (req, res) => {
  try {
    // Extract user information from the request body
    const { firstname, lastname, email, password } = req.body;

    // validate information
    if (!firstname || !lastname || !email || !password) {
      return res.status(200).json({ error: "Input fields must be required" });
    }
    // validate password
    if (password && password.length < 6) {
      return res
        .status(200)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        error: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();

    // Respond with a success message
    res.status(201).json({ status: "success", Data: user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// user Login process
exports.Login = async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = EncodeToken(user.email, user._id);

    // Respond with the token
    res.status(200).json({ status: "success", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // email account query
    const userCount = await UserModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (userCount.length > 0) {
      // OTP Insert
      const createOTP = await OTPModel.create({ email: email, otp: OTPCode });

      // send email
      const sendMail = await sendEmailUtility(
        email,
        "Your PIN code is = " + OTPCode,
        "Email Verification From zCom Shop"
      );

      res.status(200).json({ status: "success", data: sendMail });
    } else {
      res.status(200).json({ status: "fail", data: "No user found" });
    }
  } catch (error) {
    console.error("Error during emailVerify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const OTPCode = req.params.otp;

    if (OTPCode === "0") {
      return res.status(400).json({ status: "fail", data: "Invalid OTP Code" });
    } else {
      const OTPCount = await OTPModel.aggregate([
        { $match: { email: email, otp: OTPCode, status: 0 } },
        { $count: "total" },
      ]);

      if (OTPCount.length > 0) {
        const OTPUpdate = await OTPModel.updateOne(
          { email: email, otp: OTPCode, status: 0 },
          { email: email, otp: "0", status: 1 }
        );

        res.status(200).json({ status: "success", data: OTPUpdate });
      } else {
        res.status(200).json({ status: "fail", data: "Invalid OTP Code" });
      }
    }
  } catch (error) {
    console.error("Error during otpVerify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
