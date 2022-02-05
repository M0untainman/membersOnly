let express = require('express');
let router = express.Router();
const homepageController = require('../controllers/homepageController');
const authenticationController = require('../controllers/authenticationController');
const messageController = require('../controllers/messageController');

// --------------------------------------GET home page.
router.get('/', homepageController.homepage);

// --------------------------------------GET log-in page.
router.get('/log-in', authenticationController.login);

// --------------------------------------log in post route
router.post('/log-in', authenticationController.login_post);
//router.post('/log-in', authenticationController.login_post, (req, res) => {res.status(200).send('logged in!');});

// -------------------------------------- log out route
router.get('/log-out', authenticationController.logout);

// ------------------------------------- GET register page.
router.get('/register', authenticationController.register_get);
router.post('/register', authenticationController.register_post);

// ------------------------------------- GET createMsg page.
router.get('/createMsg', messageController.createMsg_get);

// ------------------------------------- POST createMsg page.
router.post('/createMsg', messageController.createMsg_post);

module.exports = router;
