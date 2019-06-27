var project = require('../../models/project/projectSchema.js');


//create new project
module.exports.createProject = function(){
    var newProject = new project({});

        newProject.name = req.body.name;
        newProject.projectLeader.name = req.body.leaderName;
        newProject.
};

//get projects
module.exports.getProject = function(){

};
//delete project
module.exports.deleteProject = function(){

} ;
//get project by id
module.exports.getProjectId = function(){

};
//update project
module.exports.updateProject = function(){

};
