const router = require('koa-router')()
const users = require('../controllers/user_info');

router.prefix('/signup')

router.post('/', users.signup)

module.exports = router;
