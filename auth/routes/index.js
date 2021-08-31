const express = require('express');
const authactions = require('../methods/auth_actions');
const barberactions = require('../methods/barber_actions');
const useractions = require('../methods/user_actions');
const router = express.Router()

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.send('cuts server works! go on.');
})

router.get('/dashboard', (req, res) => {
    res.send('dashboard test. which is not going to be used');
})

//@desc Adding a new user
//@route POST /adduser
router.post('/adduser', upload.single('file'), authactions.addNew);
//@desc Authenticate user
//@route POST /authenticate
router.post('/authenticate', upload.single('file'), authactions.authenticate);
//@desc Get info on a user user
//@route GET /getinfo
router.get('/getinfo', upload.single('file'), authactions.getinfo);


//@desc Adding a new Barber (only for developer, no frontend provided)
//@route POST /addbarber
router.post('/addbarber', upload.single('file'), barberactions.addBarber);
//@desc updating a Barber (only for developer, no frontend provided)
//@route PUT /makeachangebarber
router.put('/makeachangebarber', upload.single('file'), barberactions.makeAChange);
//@desc getting detail of a Barber (only for developer, no frontend provided)
//@route PUT /getbarber
router.post('/getbarber', upload.single('file'), barberactions.getbarber);


//@desc Adding fav Barber to their favBarber
//@route POST /favbarber
router.put('/addfavbarber', upload.single('file'), useractions.addfavBarber);
//@desc Removung fav Barber from user's favBarber list.
//@route POST /removefavbarber
router.put('/removefavbarber', upload.single('file'), useractions.removefavBarber);


//@desc Adding fav Barber to their favBarber
//@route POST /favbarber
router.put('/addchatbarber', upload.single('file'), useractions.addchatBarber);
//@desc Removung fav Barber from user's favBarber list.
//@route POST /removefavbarber
router.put('/removechatbarber', upload.single('file'), useractions.removechatBarber);


module.exports = router