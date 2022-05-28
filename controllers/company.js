const bcrypt = require('bcrypt')

const CompanyModel = require('../models/company')

module.exports = {
  create: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const existingCompany = await CompanyModel.findOne({ email })

      if (existingCompany) {
        const error = new Error('Company already exists')
        error.statusCode = 400
        throw error
      }

      const data = await CompanyModel.create({ email, password })

      res.status(201).json({
        message: 'Company added successfully',
        data,
      })
    } catch (err) {
      next(err)
    }
  },

  authenticate: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const companyData = CompanyModel.findOne({ email })

      if (!data) {
        const error = new Error('Email not found')
        error.statusCode = 401
        throw error
      }

      if (
        bcrypt.compareSync(password, companyData.password) &&
        companyData.email == email
      ) {
        res.status(200).json({
          message: 'Logged in to company',
          data: { id: companyData._id, email: companyData.email },
        })
      } else {
        const error = new Error('Invalid password')
        error.statusCode = 401
        throw error
      }
    } catch (err) {
      next(err)
    }
  },
}
