const express = require('express');
const accountController = require('../controller/account');
const authController = require('../controller/auth');
const mailController = require('../controller/mail');

const router = express.Router();

router.post('/randomPassword', accountController.randomPassword);
router.post('/randomPassword', mailController.mail);

router.post('/resetPassword', authController.verify);
router.post('/resetPassword', accountController.checkUser);
router.post('/resetPassword', accountController.resetPassword);


router.post('/setPassword', accountController.resetPassword)

module.exports = router;