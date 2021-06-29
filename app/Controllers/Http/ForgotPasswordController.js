"use strict";

// eslint-disable-next-line no-undef
const moment = require('moment')
const User = use("App/Models/User");
// eslint-disable-next-line no-undef
const crypto = require("crypto");
const Mail = use('Mail')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email")

      const user = await User.findByOrFail("email", email)

      user.token = crypto.randomBytes(10).toString("hex")
      user.token_created_at = new Date();

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}`},
        message => {
          message
            .to(user.email)
            .from('thalitagq@outlook.com', 'Thalita')
            .subject('Password recovery')
        }
      )

    } catch (error) {
      return response
        .status(error.status)
        .send({error: {message: 'Something went wrong. Does this email exists?'}})
    }
  }

  async update({ request, response}){
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)
      
      if (tokenExpired) {
        return response
          .status(401)
          .send({
            error: {
              message:
                "The recovery token is expired",
            },
          });
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()

    } catch (error) {
      return response
        .status(error.status)
        .send({error:{ message: 'Something went wrong when trying to reset your password'}})
    }
  }
}

// eslint-disable-next-line no-undef
module.exports = ForgotPasswordController;
