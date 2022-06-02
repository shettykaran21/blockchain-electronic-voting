const nodemailer = require('nodemailer')

module.exports = {
  register: (req, res, next) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: `${req.body.election_name} Registration`,
        html: `Congrats you have been registered for ${req.body.election_name} election.`,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          const error = new Error('Mail error')
          error.statusCode = 401
          throw error
        } else {
          res.status(200).json({ message: 'Mail sent successfully' })
        }
      })
    } catch (err) {
      next(err)
    }
  },
}
