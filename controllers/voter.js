const bcrypt = require('bcrypt')

const VoterModel = require('../models/voter')

const nodemailer = require('nodemailer')
const saltRounds = 10

module.exports = {
  create: async (req, res, next) => {
    try {
      const { email, election_address, election_name, election_description } =
        req.body

      const existingVoter = await VoterModel.findOne({
        email,
        election_address,
      })

      if (existingVoter) {
        const error = new Error('Voter already exists')
        error.statusCode = 400
        throw error
      }

      const voter = await VoterModel.create({
        email,
        password: email,
        election_address,
      })

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL,
        to: voter.email,
        subject: election_name,

        html: `${election_description}
        <br>Your voting id is: ${voter.email}
        <br>Your password is: ${voter.password}
        <br><a href="http://localhost:3000/home">Click here to visit the website</a>
        `,
      }

      const info = await transporter.sendMail(mailOptions)

      if (!info) {
        const error = new Error('Voter could not be added')
        error.statusCode = 401
        throw error
      }

      res.status(201).json({
        message: 'Voter added successfully',
      })
    } catch (err) {
      next(err)
    }
  },

  authenticate: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const voter = await VoterModel.findOne({ email })

      if (!voter) {
        const error = new Error('Voter not found')
        error.statusCode = 400
        throw error
      }

      if (voter.password !== password) {
        const error = new Error('Invalid password')
        error.statusCode = 401
        throw error
      }

      res.status(200).json({
        message: 'Voter found!',
        data: {
          id: voter._id,
          election_address: voter.election_address,
        },
      })
    } catch (err) {
      next(err)
    }
  },

  getAll: async (req, res, next) => {
    try {
      const { election_address } = req.body

      let voterList = []

      const voters = await VoterModel.find({ election_address })

      voterList = voters.map((voter) => {
        return {
          id: voter._id,
          email: voter.email,
        }
      })
      const count = voterList.length

      res.status(200).json({
        message: 'Voter list found successfully',
        data: {
          voterList,
          count,
        },
      })
    } catch (err) {
      next(err)
    }
  },

  deleteById: function (req, res, next) {
    VoterModel.findByIdAndRemove(req.params.voterId, function (err, voterInfo) {
      if (err) cb(err)
      else {
        res.json({
          status: 'success',
          message: 'voter deleted successfully!!!',
          data: null,
        })
      }
    })
  },

  resultMail: function (req, res, cb) {
    VoterModel.find(
      { election_address: req.body.election_address },
      function (err, voters) {
        if (err) cb(err)
        else {
          const election_name = req.body.election_name

          const winner_candidate = req.body.winner_candidate

          for (let voter of voters) {
            var transporter = nodemailer.createTransport({
              service: 'gmail',

              auth: {
                user: process.env.EMAIL,

                pass: process.env.PASSWORD,
              },
            })

            const mailOptions = {
              from: process.env.EMAIL, // sender address

              to: voter.email, // list of receivers

              subject: election_name + ' results', // Subject line

              html:
                'The results of ' +
                election_name +
                ' are out.<br>The winner candidate is: <b>' +
                winner_candidate +
                '</b>.',
            }

            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                res.json({
                  status: 'error',
                  message: 'mail error',
                  data: null,
                })

                console.log(err)
              } else console.log(info)

              res.json({
                status: 'success',
                message: 'mails sent successfully!!!',
                data: null,
              })
            })
          }

          var transporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
              user: process.env.EMAIL,

              pass: process.env.PASSWORD,
            },
          })

          const mailOptions = {
            from: process.env.EMAIL, // sender address

            to: req.body.candidate_email, // list of receivers

            subject: req.body.election_name + ' results !!!', // Subject line

            html:
              'Congratulations you won ' +
              req.body.election_name +
              ' election.', // plain text body
          }

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.json({ status: 'error', message: 'mail error', data: null })

              console.log(err)
            } else console.log(info)

            res.json({
              status: 'success',
              message: 'mail sent successfully!!!',
              data: null,
            })
          })
        }
      }
    )
  },
}
