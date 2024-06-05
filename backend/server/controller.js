import { User } from '../database/model.js'
import bcryptjs from 'bcryptjs'

export const handlerFunctions = {
  sessionCheck: async (req, res) => {
    // when this function is called, we simply want to check if there is a userId on the req.session object, and send it back if so
    if (req.session.userId) {
      // if you want more info about the user to return, you can just query right now with a findByPk():
      // const user = await User.findByPk(req.session.userId)

      res.send({
        message: "user is still logged in",
        success: true,
        userId: req.session.userId
      })
      return
    } else { 
      res.send({
        message: "no user logged in",
        success: false,
      })
      return

    }
  },

  register: async (req, res) => {
    const { username, password } = req.body

    if (await User.findOne({ where: { username: username } })) {
      res.send({
        message: 'username already exists',
        success: false
      })
      return
    }

    const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

    const user = await User.create({
      username: username,
      password: hashedPassword
    })

    req.session.userId = user.userId

    res.send({
      message: 'user created',
      success: true,
      userId: user.userId
    })
  },

  login: async (req, res) => {
    // grab values of 'username'/'password' from body object
    const { username, password } = req.body

    // see if a user exists in the db with 
    // the provided username
    const user = await User.findOne({
      where: {
        username: username
      }
    })

    // need to evaluate if that worked, if not,
    // can already respond that login failed
    if (!user) {
      res.send({
        message: 'no username found',
        success: false
      })
      return
    }

    // if we're here, then the user was found
    // now evaluate if the passwords match
    if (!bcryptjs.compareSync(password, user.password)) {
      res.send({
        message: 'password does not match',
        success: false,
      })
      return
    }

    // if we're here, then the user exists 
    // AND their password was correct!
    // So I want to "save" their userId to a cookie --> req.session
    req.session.userId = user.userId
    // req.session is a cookie saved on the user's browser. 
    // so each user that visits our site sends their custom "req" object to us, and therefore, as far as their browser knows, they are "logged in"

    // if we're here, then all is a success
    // send a response including the userId:

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId
    })

  },

  logout: async(req, res) => {
    req.session.destroy()

    res.send({
      message: "user logged out",
      success: true
    })
    return
  },
}