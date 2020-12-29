const { urlencoded } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
// const auth = require("./middleware/auth");
const nodemailer = require("nodemailer");




require("./db/conn");
const Register = require("./models/registers");
const cookieParser = require('cookie-parser');

const staticpath = path.join(__dirname, "../public/");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use(cookieParser());
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs"); //setting view engine
hbs.registerPartials(partialpath);
app.set("views", templatepath);
app.get("/", (req, res) => {
    res.status(200).render("index");
})
app.get("/register", (req, res) => {
    res.status(200).render("register");
})
// app.get("/security-test", auth, (req, res) => {
//     console.log(`my favourite jwt _ ${req.cookies.jwt}`);
//     res.render("security");
// })

app.post("/register", async (req, res) => {
    try {

        const userregister = new Register(req.body);

        //console.log("succes" + userregister);
        //token generation
        // const token = await userregister.generateAuthToken();
        // console.log("mera token" + token);
        //hashing the password


        //generating cookie
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 60000),
        //     httpOnly: true,
        //     secure: true
        // });
        //console.log(cookie);






        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fitzumba33@gmail.com', // generated ethereal user
                    pass: 'zUmba/fit33', // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'fitzumba33@gmail.com', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>thankyou for registering  </b>", // html body
            });

            // console.log("Message sent: %s", info.messageId);
            // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);








        await userregister.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send("invalid email "+error);

    }
})

app.get("/login", (req, res) => {
    res.status(200).render("login")
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const Password = req.body.Password;
        const mail = await Register.findOne({ email: email });
        const compare = bcryptjs.compare(Password, mail.Password);
        //token generation for login
       // const token = await mail.generateAuthToken();
       // console.log("mera token" + token);

        //cookie generation
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 300000),
        //     httpOnly: true,
        //     secure: true
        // });


        if (compare) {
            res.status(201).render("index");
        }
        else {
            res.send("invalid login credentials")
        }


    } catch (error) {
        res.send("invalid credentials")
    }


})
app.listen(port, () => {
    console.log(`running on ${port} port`)
})