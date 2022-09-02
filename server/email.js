const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parentassurance@gmail.com",
    pass: "mswlopwmxvnmgzcv",
  },
});

const statusConf = "Your kid's status!";

module.exports = {
  transporter,
  statusConf
};
