var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crm = require('../controllers/customerCtrl.js');
var config = require('../../config/config.js');

router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//customer routes

router.get('/:user/customer', (req, res, next) => {
  const userId = req.params.user;
  console.log({test2:req.params});
  user.findOne({_id: req.params.user}, function(err, doc){
    if(err){
      console.log(err);
      res.json(err);
    }
    console.log(doc);
  })
  //.populate('customers')
  //.exec(function(err, usr){
 //     console.log(usr);
  //});
});

router.post('/customer', crm.newCustomer);

//router.put('/customer/:id', crm.updateCustomer);

//router.delete('/customer/:id', crm.deleteCustomer)


//contract routes
//router.get('/contract', crm.listContracts);
//router.get('/contract/:id', crm.singleContract);
//router.post('/contract', crm.newContract);

//router.put('/contract/:id', crm.updateContract);

//router.delete('/contract/:id', crm.deleteContract);

//property routes
//router.get('/property', crm.listProperty);

//router.get('/property/:id', crm.singleProp);

//router.post('/property', crm.newProperty);

//router.put('/property/:id', crm.updateProperty);

//router.delete('/property/:id', crm.deleteProp);

module.exports = router;