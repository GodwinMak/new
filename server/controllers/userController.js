const db = require("../model");
const bcrypt = require("bcrypt");

const User = db.users;

exports.create = async (req, res) =>{
    try {
        const { first_name, last_name, email, password, hospital_id, user_type } =
          req.body;
        const emailCheck = await User.findOne({ where: { email: email } });

        if (emailCheck) {
          return res
            .status(409)
            .json({ message: "User with given Email already exist" });
        }

        const salt = await bcrypt.genSalt(Number(10));
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
          first_name: first_name,
          last_name: last_name,
          password: hashedPassword,
          email: email,
          hospital_id: hospital_id,
          user_type: user_type,
        });

        return res.status(200).json({message: "user create susccessfully", user});

    } catch (error) {
      res.status(500).json({ message: error });
    }
}


exports.login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
          where: { email: email },
        });

        if (!user) {
          return res
            .status(401)
            .json({ message: "Invalid User Name or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Invalid User Name or password" });
        }

        res.status(200).json({message: "login successfully", user})
    } catch (error) {
        res.status(500).json({ message: error });
    }
}