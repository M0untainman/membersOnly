let express = require('express');
let router = express.Router();
const homepageController = require('../controllers/homepageController');
const authenticationController = require('../controllers/authenticationController');

// --------------------------------------GET home page.
router.get('/', homepageController.homepage);

// --------------------------------------GET log-in page.
router.get('/log-in', authenticationController.login);

// --------------------------------------log in post route
router.post('/log-in', authenticationController.login_post);

// -------------------------------------- log out route
router.get('/log-out', authenticationController.logout);

// ------------------------------------- GET register page.
router.get('/register', authenticationController.register_get);
router.post('/register', authenticationController.register_post);

module.exports = router;
