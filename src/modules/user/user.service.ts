import express from "express";

import argon2 from "argon2";
import { IUser, IAccount, IAccountUpdate } from "../../common/interfaceProps";
import { response } from "../../common/response";
import User from "../../models/UserModels";
import { JWT } from "../../middleware/auth.genToken";

export const register = async (req: express.Request, res: express.Response) => {
  const registerAcc: IUser = req.body;

  let registerUser: any;

  //check invalid username password
  if (registerAcc.username === "" || registerAcc.password === "")
    return res
      .status(400)
      .json(response(false, "username and password must be required"));
  else {
    try {
      //check duplicate account
      console.log(registerAcc);
      const duplicateAcc: IUser | IUser[] = await User.findOne({
        username: registerAcc.username,
      });
      if (duplicateAcc)
        return res.status(400).json(response(false, "username already taken"));
      else {
        //hash password
        const hashPassword = await argon2.hash(registerAcc.password);

        registerUser = new User({
          ...registerAcc,
          password: hashPassword,
        });
        console.log(registerUser);

        await registerUser.save();
        /**
         * create token
         */

        const token = JWT({
          userId: registerUser._id,
          role: registerUser.roles,
        });

        return res.status(200).json(
          response(true, "Register successfully", {
            name: registerUser.name,
            role: registerUser.roles,
            token,
          })
        );
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(false, "Internal server error"));
    }
  }
};

export const getAllUserAccount = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    if (req.userData.role === "admin") {
      const getAllAccount: IUser | IUser[] = await User.find();
      return res
        .status(200)
        .json(response(true, "get all user success", getAllAccount));
    } else res.status(200).json(response(false, "Forbidden access"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(response(false, "fail to get all account"));
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const loginAcc: IAccount = req.body;
    if (loginAcc.username === "" || loginAcc.password === "")
      return res
        .status(400)
        .json(response(false, "username and password must be required"));
    else {
      const loginUser: IUser = await User.findOne({
        username: loginAcc.username,
      });
      if (!loginUser)
        res.status(200).json(response(false, "Incorrect username"));
      else {
        try {
          const verifyPassword = await argon2.verify(
            loginUser.password,
            loginAcc.password
          );
          if (!verifyPassword) {
            res.status(400).json(response(false, "Incorrect password"));
          } else {
            /**
             * create token
             */
            const token = JWT({
              userId: loginUser._id,
              role: loginUser.roles,
            });
            res.status(200).json(
              response(true, "Login success", {
                name: loginUser.name,
                role: loginUser.roles,
                token: token,
              })
            );
          }
        } catch (err) {
          // internal failure
          console.log(err);
          res.status(500).json(response(false, "Verify fail"));
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(response(false, "Internal server error"));
  }
};

export const updateUserAccount = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user" && req.userData.userId === req.params.id) {
    try {
      const { name, dateOfBirth, address } = req.body;

      let updateInfor = {};
      let userInfor = await User.findOne({ _id: req.params.id });
      if (!userInfor)
        res.status(404).json(response(false, "Account not found"));
      else {
        if (name === "")
          res.status(400).json(response(false, "Name is required"));
        else
          updateInfor = {
            name: name === undefined ? userInfor.name : name,
            dateOfBirth:
              dateOfBirth === undefined ? userInfor.dateOfBirth : dateOfBirth,
            address: address === undefined ? userInfor.address : address,
          };

        await User.findOneAndUpdate({ _id: req.params.id }, updateInfor, {
          new: true,
        });
        res.status(200).json(response(true, "update infor success", userInfor));
      }
    } catch (error) {}
  } else {
    res.status(403).json(response(false, "Forbidden access"));
  }
};

export const getProfileUser = async (
  req: express.Request | any,
  res: express.Response,
  userId: string
) => {
  try {
    if (
      (req.userData.role === "user" && req.userData.userId === userId) ||
      req.userData.role === "admin"
    ) {
      const userProfile = await User.findOne({ _id: userId });
      if (!userProfile) res.status(404).json(response(false, "User not found"));
      else
        res
          .status(200)
          .json(response(true, "Get profile user success", userProfile));
    } else res.status(403).json(response(false, "Forbidden access"));
  } catch (error) {
    console.log(error);
    res.status(500).json(response(false, "Internal server error"));
  }
};

export const changeUserPassword = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.userId === req.params.id) {
    try {
      const { curPassword, updatePassword } = req.body;
      const curProfile = await User.findOne({ _id: req.params.id });

      const verifyPassword = await argon2.verify(
        curProfile.password,
        curPassword
      );

      if (!verifyPassword)
        res.status(400).json(response(false, "Current password not match"));
      else {
        if (curPassword === updatePassword)
          res
            .status(400)
            .json(
              response(
                false,
                "Current password and new password couldn't match"
              )
            );
        else {
          const hashPassword = await argon2.hash(curPassword);
          await User.findOneAndUpdate(
            { _id: req.params.id },
            { password: hashPassword },
            {
              new: true,
            }
          );
        }
      }
      res
        .status(200)
        .json(response(true, "update password success", curProfile));
    } catch (error) {}
  } else res.status(403).json(response(false, "Forbidden access"));
};

export const changeRole = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "admin") {
    try {
      const userRoleUpdate = await User.findOne({ _id: req.params.id });
      if (!userRoleUpdate)
        res.status(404).json(response(false, "Account not found"));
      else {
        const roleUpdate = {
          roles: userRoleUpdate.roles === "user" ? "admin" : "user",
        };
        await User.findOneAndUpdate({ _id: req.params.id }, roleUpdate, {
          new: true,
        });
        res
          .status(200)
          .json(response(true, "Change role success", userRoleUpdate));
      }
    } catch (error) {
      res.status(500).json(response(false, "Internal server error"));
    }
  } else res.status(403).json(response(false, "Forbidden access"));
};
