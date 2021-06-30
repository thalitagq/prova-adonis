'use strict'

const Antl = use('Antl')

class User {
  
  get validateAll(){
    return true
  }

  get rules () {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confirmed",
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

// eslint-disable-next-line no-undef
module.exports = User
