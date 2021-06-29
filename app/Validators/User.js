'use strict'

class User {
  
  get validateAll(){
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique',
      password: 'required|confirmed' 
    }
  }
}

// eslint-disable-next-line no-undef
module.exports = User
