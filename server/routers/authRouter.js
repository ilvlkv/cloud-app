const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const User = require('../models/User');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.auth);
router.get('/users', controller.getUsers);

module.exports = router;
