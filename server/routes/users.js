const router = require('express').Router();
let User = require('../models/users.model.js');

router.route('/').get((req, res)=>{
    User
    .find()
    .then((users)=>{ return res.status(200).json(users)})
    .catch((err)=>{
        return res.status(400).json(`Error: ${err}`);
    });
});

router.route('/:id').get((req, res)=>{
    const id = req.params.id;
    User.findById(id)
    .then((user)=>{
        return res.status(200).json(user);
    })
    .catch((err)=>{
        return res.status(400).json(`Error: ${err}`)
    });
});

router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then((user)=>{
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save()
            .then(()=>{res.json('User updated')})
            .catch((err)=>{res.status(400).json(`Error: ${error}`)});

    })
    .catch((err)=> {res.status(400).json(`Error: ${err}`)});
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({firstName, lastName, email, password});

    newUser.save()
    .then(()=> { return res.json("user added")})
    .catch((err) => { return res.status(400).json(`Error: ${err}`)});
});

router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>{ return res.json("User removed")})
    .catch((err)=>{ return res.status(400).json(`Error: ${err}`)});
});

module.exports = router;
