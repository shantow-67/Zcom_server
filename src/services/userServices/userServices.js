const userOTPServices = require("./otpSendServices");
const userVerifyService = require("./otpVerifyServices");
const sendEmailUtility = require("../../util/sendEmailUtility");
const UserModel = require("../../models/UsersModel");
const { EncodeToken } = require("../../util/TokenHelper");

exports.userLogin = async (req) => {
  try {
    const email = req.params.email;

    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // send email
    const sendMail = await sendEmailUtility(
      email,
      "Your PIN code is = " + OTPCode,
      "Email Verification From zCom Shop"
    );
    await userOTPServices(email, OTPCode, UserModel);

    return { status: "success", data: "6 Digit OTP send your Email" };
  } catch (e) {
    return { error: "Internal Server Error" };
  }
};

exports.userVerify = async (req, res) => {
  try {
    const email = req.params.email;
    const OTPCode = req.params.otp;

    if (OTPCode === "0") {
      return { status: "fail", data: "Invalid OTP Code" };
    } else {
      const verify = await userVerifyService(email, OTPCode, UserModel);

      if (verify === 1) {
        const user_id = await UserModel.find({
          email: email,
          otp: OTPCode,
        }).select("_id");

        // create JWT Token
        const token = EncodeToken(email, user_id[0]["_id"].toString());

        await userOTPServices(email, "0", UserModel);

        return { status: "success", message: "Verify Success", token };
      } else {
        return { status: "fail", data: "Invalid OTP Code" };
      }
    }
  } catch (e) {
    return { error: "Internal Server Error" };
  }
};