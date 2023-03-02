const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.auth);

module.exports = router;
