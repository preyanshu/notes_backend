var jwt = require('jsonwebtoken');
const JWT_SECRET = 'PRYANSHU';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        console.log(token)
        console.log(JWT_SECRET)
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(token)
        console.log(data)
        req.abc=  data.user;
        // console.log(req.loda);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;