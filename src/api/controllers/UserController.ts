import { Request, Response } from "express";
import User, { getSignedJwtToken } from "../models/userModel";
// for encryption and decryption of password
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import properties from "../../config/properties";

class UserController {
    //API : /api/v1/users/login
    //Method : POST
    //Access : Public
    //Description : login a user
    public login = async (req:Request, res:Response) => {
        let {email, password} = req.body;
        try {
            if(!email || !password){
                return res.status(400).json(
                    {
                        auth: false,
                        message: "email or password is missing!"
                    }
                );
            }
            email = email.toLowerCase();
            // fetch user's data
            let user = await User.findOne({ email: email });
            if (user) {
                var decryptedPassword:any = aes.decrypt(user.password, properties.AES_SECRET);
                decryptedPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
                if(decryptedPassword === password){
                    const token = getSignedJwtToken(user._id);
                    return res.json(
                        { auth: true, token: token, message: "Log in succussfully!" }
                    );
                }else{
                    return res.status(400)
                        .json({ auth: false, message: "Wrong Password!" });
                }
            }else{
                return res.status(400)
                    .json({ auth: false, message: "Email doesn't exist!" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {
                    auth: false,
                    message: "Technical Server Error!",
                }
            );
        }
    }

    //API : /api/v1/users/signup
    //Method : POST
    //Access : Public
    //Description : signup new user
    public signup = async (req:Request, res:Response) => {
        let name = req.body.name;
        let email = req.body.email.toLowerCase();
        let password = req.body.password; // unencrypted password

        try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400)
                .json({ status: false, message: "Email already exist!" });
        }

        var encryptedPassword = aes.encrypt(password, properties.AES_SECRET).toString(); // hash password
        let user = new User({
            name: name,
            email: email,
            verify: false,
            password: encryptedPassword
        });

        await user.save();
        return res.json({status: true, message: "Successfully created account!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Technical Server Error!",
            });
        }
    };
}

export default new UserController();