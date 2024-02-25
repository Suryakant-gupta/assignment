const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

var nodemailer = require('nodemailer');

const subjectTemp = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body style="width: 100%; height: 100vh; display: grid; place-content: center;">
    
    <div class="card m-auto  " style="width: 18rem; ">
  <div class="card-body">
    <h5 class="card-title">Assignment notification </h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">to shashi sales and marketing</h6>
    <p class="card-text">You can visit shashi sales by clicking on the following link</p>
    <a href="https://www.shashisales.com/" class="card-link">shashi sales</a>
  </div>
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
</html>`


app.get("/submit", (req, res) => {
    res.render("submit.ejs");
})


app.get("/", (req, res) => {
    
    res.render("form");
})

app.post("/", (req, res) => {
    let userEmail = req.body.userEmail;
    let userNumber = req.body.userNumber;
    console.log(userEmail);
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bgmilelomujhse@gmail.com',
    pass: 'zxyt vaqy qqqt loze'
  }
});

var mailOptions = {
  from: 'bgmilelomujhse@gmail.com',
  to: `${userEmail}`,
  subject: 'Email of successfull assignment',
  html: subjectTemp
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

const accountSid = 'ACc3fe12b5b1bd359d7c459b7c46c1174d';
const authToken = '21f914fa631d1e97e6479974e835b48b';

const client = require('twilio')(accountSid, authToken);

    const message = 'This is notificatino message on successful complition of assignment'
    
    client.messages.create({
        from: 'whatsapp:+14155238886', 
        body: message,
        to: `whatsapp:+91${userNumber}`
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));

    res.redirect("/submit");
})





app.listen(3000, () => {
    console.log("listening on port 3000");
})