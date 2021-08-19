const express = require('express');
const authactions = require('../methods/auth_actions');
const barberactions = require('../methods/barber_actions');
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
router.post('/adduser', authactions.addNew);
//@desc Authenticate user
//@route POST /authenticate
router.post('/authenticate', authactions.authenticate);
//@desc Get info on a user user
//@route GET /getinfo
router.get('/getinfo', authactions.getinfo);

//@desc Adding a new Barber (only for developer, no frontend provided)
//@route POST /addbarber
router.post('/addbarber', upload.single('file'), barberactions.addBarber);
//@desc updating a Barber (only for developer, no frontend provided)
//@route PUT /makeachangebarber
router.put('/makeachangebarber', upload.single('file'), barberactions.makeAChange);



module.exports = router