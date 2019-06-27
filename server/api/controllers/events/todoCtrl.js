//modules

const todo = require('../../models/events/eventModel.js');
const user = require('../../models/user-model.js');


//create new todo for owner
module.exports.newTodo = (req, res, next) => {
    var userId = req.body.userId;
    user.findOne({_id: userId}, function(err, usr){
         

             //init new todo
        const newTodo = new todo({});
        newTodo.title = req.body.title;
        newTodo.description = req.body.description;
        newTodo.owner = usr._id;
        usr.todos.push(newTodo);
        console.log(usr.todos[0]);
        usr.save(function(err){
            newTodo.save(function(err){
                if(err) res.json(err);
        
                console.log(newTodo);
                console.log('new todo was created');
                res.json({msg: "new todo was created"});
            });
        });
    });
    //save to todo collection and user collection

};


//retrieve todos created by user
module.exports.getTodos = (req, res, next) => {
    todo.find({})
    .exec(function(err, docs){
        if(err) {
            res.json(err);
            next()
        }
        res.json(docs);
        next()
    });
};


//delete todo created by user
//delete customer
module.exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    todo.remove({_id: todoId}, function(err){
        if(err){
            res.json({msg: err})
            next()
        } else {
            res.json({msg: 'todo has been deleted'});
            next()
        };
    })
};

//update to do by user
module.exports.updateTodo = function(req, res){
    var todoObj = req.body;
    console.log(userObj);
        todo.updateOne({_id: req.params.id}, todoObj, {new: true}, function(err, todoo){
            if(err) res.json(err);
            console.log(todoo);
            res.json({msg: 'todo has been updated'})
        });
};

