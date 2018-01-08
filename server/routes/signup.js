const router = require('koa-router')()
const users = require('../controllers/user_info');

router.post('/', users.signup)

module.exports = router;
