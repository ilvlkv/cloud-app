const Router = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');

router.post('', authMiddleware, fileController.createDir);
router.get('', authMiddleware, fileController.getFiles);

module.exports = router;
