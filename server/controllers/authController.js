const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const { login, password, username } = req.body;
      const candidate = await User.findOne({ login });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким логином уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'user' });
      const user = new User({
        login,
        password: hashPassword,
        username,
        roles: [userRole.value],
      });
      await user.save();

      return res.json({
        status: 200,
        message: `User ${login} was succesfully registered`,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: `Пользователя с таким логином не существует`,
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }

      const token = generateAccessToken(
        user._id,
        user.roles,
        user.username,
        user.login
      );

      return res.status(200).json({
        status: 200,
        message: `Вы успешно авторизовались как ${login}`,
        user: {
          _id: user._id,
          name: user.username,
          token,
        },
        timestamp: Date.now(),
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Unknown login error' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
