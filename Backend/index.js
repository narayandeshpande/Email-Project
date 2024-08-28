const express = require('express');
require('dotenv').config();
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();


app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
   const { email, body } = req.body;

   try {
       const transporter = nodemailer.createTransport({
           service: "gmail",
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS
           }
       });

       const mailOptions = {
           from: process.env.EMAIL_USER,
           to: email,
           subject: "Testing Email",
           html: `<p>${body}</p>`
       };

       transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
               console.error(error);
               return res.status(500).json({ error: 'Error sending email' });
           } else {
               console.log("Email sent: " + info.response);
               return res.status(200).json({ info });
           }
       });
   } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal Server Error' });
   }
});

// Start the server
app.listen(3000, () => {
   console.log("App is running on port 3000");
});
