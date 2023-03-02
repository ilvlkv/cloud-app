const User = require('../models/User');
const Role = require('../models/Role');
const File = require('../models/File');
const fileService = require('../services/fileService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id) => {
  const payload = {
    id,
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
      await fileService.createDir(new File({ user: user._id, name: '' }));
      return res.json({
        status: 200,
        message: `Пользователь ${login} успешно зарегистрирован. Вернитесь на страницу авторизации и войдите в приложение :)`,
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

      const token = generateAccessToken(user._id);

      return res.status(200).json({
        status: 200,
        message: `Вы успешно авторизовались как ${login}`,
        timestamp: Date.now(),
        data: {
          token,
          user: {
            id: user._id,
            login: user.login,
            username: user.username,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
          },
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Unknown login error' });
    }
  }
  async auth(req, res) {
    try {
      const user = await User.findOne({ id: req.user.id });
      const token = generateAccessToken(user._id);

      return res.json({
        id: user._id,
        login: user.login,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
      });
    } catch (e) {
      console.log(e), res.send({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new authController();
