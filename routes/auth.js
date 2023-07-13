const express = require("express")
const router = express.Router();
const usermodel=require("../models/User")
const {body,validationResult}=require("express-validator")
const jwt =require("jsonwebtoken")
var fetchuser = require('../models/middleware/fetchuser');
const JWT_SECRET="PRYANSHU"


const bcrypt=require("bcryptjs")
//create a user using : post api/auth 
router.post("/signup",[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    let success=false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        let bool=await usermodel.findOne({email:req.body.email});
        if(bool){
            return res.status(400).json({success,error:"email already exist"})
        }

        const salt = await bcrypt.genSalt(10)//take care of await 
        let secpass=await  bcrypt.hash(req.body. password,salt);  //take carfe of await

        
        const user = usermodel({
        
            name:req.body.name
            ,
            email:req.body.email,
            password:secpass
           
          })
        user.save().then(()=>{
             
            console.log("sAVED")
            })
        // }).catch(err=> {console.log(err)
        // res.json({error:"enter unique value"})});
        // const dat
        let data ={
          user:{
            id: user.id
          }
        }
      


      const authToken =jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authToken})
      // console.log(data)
      // res.json(data)



    
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"internal server error"})
        
    }
  

})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await usermodel.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    console.log(usermodel)
    console.log(user)
    const data = {
      user: {
        id: user.id
      }
    }
    console.log("login wala data")
    console.log(data)
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.abc.id;
    console.log("hi")
    console.log(req.abc.id);
    const user = await usermodel.findById(userId).select("-password")
    console.log(user)
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;

// module.exports=router;