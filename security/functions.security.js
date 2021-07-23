function authorize(...allowed){

    return (req, res, next) => {
      if(req.auth.user){
        const role = getRole(req.auth.user);
        if( isAllowed(role, allowed) ){
          return next();
          
        }
        res.status(401).send('Role not allowed');
      }
      res.status(401).send('User not found!');
    }
  }
  
function isAllowed (role, allowed){
    return (allowed.indexOf(role) > -1);
  } 
  
  
function getRole(username){
    if(username ==='admin'){
      return 'admin';
    }
    if(username ==='tonio'){
      return 'vendedor';
    }
    return 'no role';
  }
  
  export default { authorize }