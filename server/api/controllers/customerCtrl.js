//modules
const contract = require('../models/customer/contract.js');
const customer = require('../models/customer/customer.js');
const property = require('../models/customer/property.js');
const user = require('../models/user-model.js');
//create new customer
module.exports.newCustomer = (req, res, next) => {
    console.log(req.body);
    var userId = req.body.owner;
    user.findOne({_id: userId}, function(err, usr){

    const newCust = new customer({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        owner: usr._id
    });
    
    
    usr.customers.push(newCust);


        usr.save(function(err){
            if(err){
                res.json({msg: err});
                next();
            } else{
            newCust.save(function(err){
                if(err){
                    res.json({msg: err});
                    next();
                }
                else {
                    console.log('customer was created');
                    next();
                };
            });
            res.json({msg: 'customer has been saved in user collection'});
            next();
        }
        });
        
    });
};

//admin list


//list all customer 

module.exports.listCustomers = (req, res, next) => {
    const userId = req.params.user;
    console.log({test2:req.params});
    user.findOne({_id: req.params.user})
    .populate('customers')
    .exec(function(err, usr){
        console.log(usr.customers);
        res.json({info:usr.customers});
    });
};

//delete customer
module.exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.id;
    customer.remove({_id: customerId}, function(err){
        if(err){
            res.json({msg: err})
            next()
        } else {
            res.json({msg: 'customer has been deleted'});
            next()
        };
    })
};

//update customer
module.exports.updateCustomer = (req, res, next) => {
    const userId = req.params.id;
    update({_id: userId}, req.body, function(err){
        if(err){
            res.json({msg: err})
            next()
        } else {
            res.json({msg: 'customer has been updated'})
            next()
        };
    });
};



//single customer
module.exports.singleCustomer = (req, res, next) => {
    const custId = req.params.id;
    customer.findOne({_id: custId}, function(err, cust){
        if(err){
            res.json({msg: err});
            next();
        } else {

            res.json(cust);
            next()
        };
    });
};




//contracts area

//single contract
module.exports.singleContract = (req, res, next) => {
    const conId = req.params.id;
    contract.findOne({_id: conId})
    .populate('customer')
    .exec(function(err, doc){
        console.log(doc.customers);
        res.json(doc.customers);
    });
};
//get all contracts
module.exports.listContracts = (req, res) => {
    var user = req.params.user;
    contract.find({_id: user})
    .populate('customers')
    .exec(function(err, doc){
        console.log(doc.customers);
        res.json(doc.customers);
    });
};
//create new contract for customer
module.exports.newContract = (req, res, next) => {
    const customerId = req.params.id;
    find({_id: customerId}, function(err, cust){
        const newContract = new contract({});
            newContract.status = req.body.status;
            newcontract.details.contractsummary = req.body.contractsummary;
            newContract.details.customer = cust._id;
            newContract.details.lengthOfContract = req.body.lengthOfContract;

            save(function(err){
                if(err){
                    res.json({msg: err});
                    next()
                } else {
                    newContract.save(function(err){
                        if(err) {
                            res.json({msg: err});
                            next()
                        } else {
                            res.json({msg: 'contract has been saved and add to customer collection'});
                        }
                    });
                };
            });
    });
};
//update contract info
module.exports.updateContract = (req, res, next) => {
    contract.updateOne({_id: contId}, req.body, function(err){
        if(err){
            res.json({msg: err});
            next()
        } else {
            res.json({msg: 'contract has been updated'});
            next()
        };
    });
};
//mark contract as complete
module.exports.contractComplete = (req, res, next) => {
    const contId = req.params.id;
    contract.findOne({_id: contId}, function(err, con){
        con.complete = req.body.complete;

        con.save(function(err){
            if(err){
                res.json({msg: err});
                next();
            } else {
                res.json({msg: 'contract has been updated'});
            };
        });
    });
};
//delete contract
module.exports.deleteContract = (req, res, next) => {
    const conId = req.params.id;
    contract.remove({_id: conId}, req.body, function(err){
        if(err){
            res.json({msg: err});
            next()
        } else {
            res.json({msg: 'property has been updated'});
            next()
        };
    });
};

//property area


//single property
module.exports.singleProp = (req, res, next) => {
    const propId = req.params.id;
    property.findOne({_id: propId}, function(err, prop){
        if(err){
            res.json({msg: err});
            next();
        } else {
            res.json(prop);
            next()
        };
    });
};

//get property
module.exports.listProperty = (req, res) => {
    property.find({}, function(err, cust){
        if(err){
            res.json({msg: err})
            next()
        } else {
            res.json(cust);
            next()
        };
    });
};
//create new property
module.exports.newProperty = (req, res, next) => {
    const newProp = new property();
        newProp.address = req.body.address;
        newProp.developers = req.body.developers;
        newProp.houseSpecs.houseType = req.body.houseType;
        newProp.houseSpecs.bathrooms = req.body.bathrooms;
        newProp.houseSpecs.propertySeller = req.body.propertySeller;

        newProp.save(function(err){
            if(err){
                res.json({msg: err});
                next()
            } else {
                res.json({msg: 'property has been added to db'})
            };
        });
};
//update property info
module.exports.updateProperty = (req, res, next) => {
    const propId = req.params.id;
    property.update({_id: propId}, req.body, function(err){
        if(err){
            res.json({msg: err});
            next()
        } else {
            res.json({msg: 'property has been updated'});
            next()
        };
    });
};
//delete property
module.exports.deleteProp = (req, res, next) => {
    const propId = req.params.id;
    property.remove({_id: propId}, req.body, function(err){
        if(err){
            res.json({msg: err});
            next()
        } else {
            res.json({msg: 'property has been updated'});
            next()
        };
    });
};