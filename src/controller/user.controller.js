import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function login(req, res) {
  try {
    const { phone, password } = req.body;
    if (phone && password) {
      const user = await User.findOne({
        where: {
          phone,
          password,
        },
      });
      if (user) {
        const token = jwt.sign(
          { id: user.id, type: user.type },
          process.env.SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.send({
          token,
          name: user.full_name,
        });
      } else {
        throw new Error("User is not found with these crediantials");
      }
    } else {
      throw new Error("please provide login and password");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}
