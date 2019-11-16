const Router = require('express').Router();
let Purchase = require('../models/purchase.model');

// get all purchases
Router.route('/').get((req, res) => {
  Purchase.find()
    .then(purchases => res.json(purchases))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new purchase
Router.route('/add').post((req, res) => {
  const name = req.body.name;
  const cost = Number(req.body.cost);
  const date = Date(req.body.date);

  const newPurchase = new Purchase({
    name,
    cost,
    date
  });

  newPurchase.save()
    .then(() => res.json('Purchase added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// edit a purchase
Router.route('/update/:id').post((req, res) => {
  Purchase.findById(req.params.id)
    .then(purchase => {
      purchase.name = req.body.name;
      purchase.cost = Number(req.body.cost);
      purchase.date = Date.parse(req.body.date);

      purchase.save()
        .then(() => res.json('Purchase updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete a purchase
Router.route('/:id').delete((req, res) => {
  Purchase.findByIdAndDelete(req.params.id)
    .then(() => res.json('Purchase deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = Router;