const router = require('express').Router();
let Budget = require('../models/budget.model.js');

router.route('/').get((req, res)=>{
    Budget.
        find()
        .then((lines)=>{
            return res.status(200).json(lines);
        })
        .catch((err)=>{
            return res.status(400).json(`Error ${err}`);
        })
});

//TODO: Need an add action
router.route('/add').post((req, res)=>{
    const type = req.body.type;
    const description = req.body.description;
    const category = req.body.category;
    const amount = req.body.amount;
    const date = new Date();
    const user_id = req.body.user_id;

    let budgetLine = new Budget({ type,description, category, amount, date, user_id});
    budgetLine.save()
    .then(()=>{
        return res.status(200).json('Line item added');
    })
    .catch((err)=>{
        return res.status(400).json(`Error: ${err}`);
    })

});

//TODO: Need a delete action
router.route('/:id').delete((req, res)=>{
    Budget.findByIdAndDelete(req.params.id)
        .then(()=>{
            return res.status(200).json('Line item deleted');
        })
        .catch((err)=>{
            return res.status(400).json(`Error: ${err}`);
        });
});

//TODO: Need an edit action
router.route('/update/:id').post((req, res)=>{
    Budget.findById(req.params.id)
        .then((budget)=>{

            if(!budget) {
                return res.status(200).json('Line item not found');
            }

            budget.type = req.body.type;
            budget.amount = Number(req.body.amount);
            budget.description = req.body.description;
            budget.category = req.body.category;
            budget.user_id = req.body.user_id;

            budget.save().then(()=>{ 
                return res.json('Line item updated')
            })
            .catch((err)=>{
                return res.status(400).json(`Error: ${err}`);
            });

        })
        .catch((err)=>{
            return res.status(400).json(`Error: ${err}`);
        });
});

module.exports = router;