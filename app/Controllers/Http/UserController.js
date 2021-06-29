'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request }){
    const data = request.only(['username', 'email', 'password'])
    
    const user = await User.create(data)
  
    return user
  }
}

// eslint-disable-next-line no-undef
module.exports = UserController
