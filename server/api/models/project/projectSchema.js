var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var project = new Schema({
    name: {type: String},
    members: [],
    projectLeader: {},
    project: {
        stages: {
            stage1: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            },
            stage2: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            },
            stage3: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            },
            stage4: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            },
            stage5: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            },
            stage6: {
                name: {type: String},
                plans: {type: String},
                accomplished: [] 
            }
        },
    objective: { type: String},
    potentialClients: [],
    logo: {},

    },
    public: {type: Boolean}

});

module.exports = mongoose.model(project, 'project');