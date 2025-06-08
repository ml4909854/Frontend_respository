

const checkAccess = (requiredRole)=>{
    return (req , res , next)=>{
        if(requiredRole !== req.user.role){
            return res.status(403).json({message:"You are not authorised. You have no permission!"})
        }
        next()
    }
}

module.exports  = checkAccess