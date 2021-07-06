'use strict'

const User = use("App/Models/User");

class SessionController {
  async store({request, auth}){
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user_id = await User.query()
      .where("email", email)
      .pluck("id")
      .first();

    return {token, user_id}
  }
}

// eslint-disable-next-line no-undef
module.exports = SessionController
