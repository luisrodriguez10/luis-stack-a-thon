const Sequelize = require("sequelize");
const db = require("../db");
const { transporter, statusConf } = require('../../email');

const StudentStatus = db.define("studentStatus", {
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});


StudentStatus.addHook('afterSave', async(studentStatus) =>{
  const date = new Date(studentStatus.date);

  const student = await db.models.student.findOne({
    where: {
      id: studentStatus.studentId
    }
  })

  const status = await db.models.status.findOne({
    where: {
      id: studentStatus.statusId
    }
  })

  const parent = await db.models.user.findOne({
    where: {
      id: student.userId
    }
  })

  const bus = await db.models.bus.findOne({
    where: {
      id: student.busId
    }
  })

  const driver = await db.models.user.findOne({
    where: {
      id: bus.userId
    }
  })

  const email = parent.email;
  const header = [`<div><span style="font-weight:bold">Hello Mr./Mrs. ${parent.lastName}. Please find below the current status of your kid on the bus.</span></div> <br>`]
  const msg = [`<div>
                  <span style="font-weight:bold">Date:</span> ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}   
                </div>
                <br>
                <div>
                  <span style="font-weight:bold">Time:</span> ${studentStatus.time}  
                </div>
                <br>
                <div>
                  <span style="font-weight:bold">Status:</span> ${status.status}  
                </div>
                <br>
                <div>
                  <span style="font-weight:bold">Bus #:</span> ${bus.number}  
                </div>
                <br>
                <div>
                  <span style="font-weight:bold">Bus Driver:</span> ${driver.firstName} ${driver.lastName}  
                </div>`]

  msg.unshift(header);

  const mailOptions = {
    from: "parentassurance@gmail.com",
    to: email,
    subject: `Hello Mr./Mrs. ${parent.lastName}, ${statusConf}`,
    html: msg.join("")
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

})


module.exports = StudentStatus;
