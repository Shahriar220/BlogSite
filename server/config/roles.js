const AccessControl = require('accesscontrol');

let grantsObject = {
    admin:{
        profile:{
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        articles:{
            'read:any':['*']
        },
        article:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        }
    },
    user:{
        profile:{
            'read:own': ['*','!password','!id','!date'],
            'update:own': ['*'],
        }
    }
}


const ac = new AccessControl(grantsObject);

module.exports = { ac }