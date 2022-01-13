const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "WebRel",
      sub: userID,
    },
    "WebRel",
    { expiresIn: "30m" }
  );
};

userRouter.get("/", async (req, res) => {
  const totalUsersInDB = await User.find({}).countDocuments();
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || "0");
  const total = await User.find(
    { $or: [{ username: { $regex: req.query.search, $options: "$i" } }, { role: { $regex: req.query.search, $options: "$i" } }, { custnumb: { $regex: req.query.search, $options: "$i" } }] },
    "-password"
  ).countDocuments();
  const users = await User.find(
    { $or: [{ username: { $regex: req.query.search, $options: "$i" } }, { role: { $regex: req.query.search, $options: "$i" } }, { custnumb: { $regex: req.query.search, $options: "$i" } }] },
    "-password"
  )
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * (page - 1));
  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    users,
    totalUsersInDB,
  });
});

userRouter.get("/findone/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id, "-password -username");
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/findoneusername/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id, "-password -companyname -custnumb -role -language");
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Delete User",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Deleted User",
          msgError: false,
        },
      });
  });
});

userRouter.put("/:id", async (req, res) => {
  const _id = req.params.id;
  let newusername = req.body.username;
  let users = await User.findOne({ $or: [{ username: newusername }] }, "-password");

  if (newusername !== undefined) {
    if (users !== null) {
      res.status(500).json({
        message: {
          msgBody: "Username already exists or is not changed",
          msgError: true,
        },
      });
    } else {
      if (req.body.password !== undefined) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        await User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
          if (err) {
            res.status(500).json({
              message: {
                msgBody: "Unable to Update User",
                msgError: true,
              },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully Updated User and Changed Password",
                msgError: false,
              },
            });
          }
        });
      } else {
        await User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
          if (err) {
            res.status(500).json({
              message: {
                msgBody: "Unable to Update User",
                msgError: true,
              },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully Updated User",
                msgError: false,
              },
            });
          }
        });
      }
    }
  } else {
    if (req.body.password !== undefined) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);

      await User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Unable to Update User",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Successfully Updated User and Changed Password",
              msgError: false,
            },
          });
        }
      });
    } else {
      await User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, context: "query" }, (err, response) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Unable to Update User",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Successfully Updated User",
              msgError: false,
            },
          });
        }
      });
    }
  }
});

/*userRouter.get('/habibi2', async (req,res) => {
try {
    const Allusers = await User.find();
        
        for( let user of Allusers) {
            await User.findOneAndDelete({username: user.username})

            if (user.role === "99") {
                user.role = "admin";
            } else if (user.role === "1" || user.role === "21" || user.role === "22") {
                user.role = "user";
            }

            const newUser = new User({companyname : user.companyname, custnumb : user.custnumb, language : user.language, password : user.password, role : user.role, username : user.username})
            let res = await newUser.save()
        }

        res.send("Klar");
}
    catch (err){
        console.log(err)
        res.status(400).send("Funkar ej");
    }
});*/

userRouter.post("/adduser", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  const allFields =
    req.body.companyname == "" ||
    req.body.companyname == undefined ||
    req.body.custnumb == "" ||
    req.body.custnumb == undefined ||
    req.body.password == "" ||
    req.body.password == undefined ||
    req.body.username == "" ||
    req.body.username == undefined;

  if (user) {
    res.status(400).json({ message: { msgBody: "Username already exists", msgError: true } });
  } else if (allFields) {
    res.status(400).json({ message: { msgBody: "All fields are not filled out", msgError: true } });
  } else {
    const newUser = new User(req.body);
    newUser.save();
    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
  }
});

userRouter.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role, companyname, password } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username, role, companyname, _id, password } });
  }
});

userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ message: { msgBody: "You are an admin", msgError: false } });
  } else res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

userRouter.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { _id, username, companyname, role, password } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { _id, username, companyname, role, password } });
});

module.exports = userRouter;
