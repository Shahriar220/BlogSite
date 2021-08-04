const {ac}=require('../config/roles');
const { checkLoggedIn } = require('./auth');


exports.grantAccess =  function(action, resource){
    return async (req,res,next) =>{
        try{
            const permission = ac.can(req.user.roles)[action](resource);
            if(!permission.granted){
                return res.status(400).json({
                    error:"Youn dont have permission"
                })
            }
            res.locals.permission=permission
            next()
        } catch(error){
            next(error)
        }

    }
}
