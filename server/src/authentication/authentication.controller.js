const {
  addUserService,
  getUserByEmailService,
} = require("../user/user.service");
const {
  generateToken
} = require("./authentication.service")
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const {firstName,lastName, email, password } = req.body;

    bcrypt.genSalt(13, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, password) {
        try {
          const result = await addUserService({firstName,lastName, email, password });
          if (result === null) {
            res
              .status(200)
              .json({ message: "No user were registred.", ok: false });
          } else {
            res
              .status(200)
              .json({ message: "user registred successfully.", ok: true });
          }
        } catch (error) {
          return res.json({ error: error?.message ? error.message : error });
        }
      });
    });
  } catch (error) {
    return res.json({ error: error?.message ? error.message : error });
  }
};
const loginController = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const details = await  getUserByEmailService(email);
    if (!details) {
      res.status(404).json({ message: "User not found.", ok: false });
    } else {
      bcrypt.compare(password, details[0].password, function (err, result) {
        if (result) {
          const token = generateToken({
            id: details[0].idUser,
            email: details[0].email,
          },10*1000);
          const refreshtoken = generateToken({
            id: details[0].idUser,
            email: details[0].email,
          },10*1000);
          res
            .status(200)
            .cookie("refreshtoken", refreshtoken, {
              httpOnly: true,
              secure: true,
            })
            .cookie("jwt", token, {
              httpOnly: true,
              secure: true,
            })
            .json({
              message: "User logged successfully",
              ok: true,
              token,
              refreshtoken
            });
            
        } else {
          res
            .status(200)
            .json({ message: "not credentials matching", ok: false });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error?.message ? error.message : error });
  }
};

module.exports = {
  registerController,
  loginController
};
