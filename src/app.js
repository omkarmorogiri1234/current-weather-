const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


require("./db/conn");
 const Register = require("./models/registers");
 const async = require("hbs/lib/async");


 const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req, res) =>{
res.render("register")
});

app.get("/register",(req, res) =>{
    res.render("register")
    });

    app.post("/register",async(req, res) =>{
        try {
            // console.log(req.body.email);
            // res.send(req.body.email);
            const password = req.body.password;
            const conpassword = req.body.conpassword;
            if (password == conpassword) {
                const userRegistration = new Register({
                    email:req.body.email,
                    password:req.body.password,
                    conpassword:req.body.conpassword
                })

await userRegistration.save();
res.status(201).render("login");
            } else {
res.send("password not matching")
                
            }
        } catch (error) {
            res.status(400).send(error);
        }
        });

app.get("/login",(req, res) =>{
    res.render("login")
    });   

    app.post("/login", async(req,res)=>{
        try {
            const{email,password} = req.body;
            if(!email||!password){
                return res.status(400).json({error:"invalid email or password "})
            }
            const userLogin = await Register.findOne({email:email});
            
            if(!userLogin){
res.json({error:"user error"});
            }else{
                if(userLogin.password){
                    const dbPassword = userLogin.password;
                 //    console.log(dbPassword);
                 //    console.log(password);
                    if(dbPassword===password){
                     res.render("index");
     
                    }
                    else{
                        res.json("invalid password")
                    }
                 }
                // res.render("index");
              
            }

        } catch (err) {
            console.log(err);
        }
    })

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})