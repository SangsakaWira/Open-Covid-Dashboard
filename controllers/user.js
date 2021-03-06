const user = require("../models/user")
const dokter = require("../models/dokter")
const bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10)

exports.register = (req, res) => {
  // maximum salt is 10, don't use 30
  let password = req.body.password
  let confirm_pass = req.body.confirm_password
  console.log(password !== confirm_pass)
  if (password === confirm_pass) {
    user.create(
      {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        role: "2"
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          req.flash(
            "error",
            "It looks like the username or password is already taken"
          )
          res.redirect("/page/register-page")
        } else {
          dokter.create(
            { id_user: doc._id, nama_lengkap: req.body.nama_lengkap },
            err => {
              if (err) console.log(error)
              else {
                req.flash("success", "Register Success")
                res.redirect("/page/login-page")
              }
            }
          )
        }
      }
    )
  } else {
    req.flash("error", "Password is not match")
    res.redirect("/page/register-page")
  }
}

exports.login = (req, res) => {
  user.findOne(
    {
      $and: [
        {
          $or: [{ role: "2" }, { role: "3" }]
        },
        {
          $or: [{ username: req.body.username }, { email: req.body.username }]
        }
      ]
    },
    (err, doc) => {
      if (err) {
        res.send(err)
      } else {
        if (doc != null) {
          if (bcrypt.compareSync(req.body.password, doc.password)) {
            req.session.isLoggedIn = true
            req.session.username = doc.username
            req.flash("success", "Login Success")
            res.redirect("/page/covid-19")
          } else {
            req.flash("error", "Wrong Password")
            res.redirect("/page/login-page")
          }
        } else {
          req.flash("error", "No User Found")
          res.redirect("/page/login-page")
        }
      }
    }
  )
}

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.send()
    }
    res.redirect("/page/login-page")
  })
}

exports.createUser = (req, res) => {
  res.send({
    message: req.flash("success"),
    username: req.session.username
  })
}

exports.update = (req, res) => {
  user.findOneAndUpdate(
    { username: req.session.username },
    req.body,
    { new: true },
    (error, doc) => {
      if (error) res.redirect("/page/edit-user-page")
      else {
        req.session.username = doc.username
        req.flash("success-update", "User updated")
        res.redirect("/page/edit-user-page")
      }
    }
  )
}

exports.apiLogin = (req, res) => {
  user.findOne(
    {
      $or: [{ username: req.body.username }, { email: req.body.username }]
    },
    (err, doc) => {
      if (err) {
        res.send({ status: 0, message: "Error" })
      } else {
        if (doc != null) {
          if (bcrypt.compareSync(req.body.password, doc.password)) {
            const { password, ...data } = doc._doc
            res.send({ status: 1, message: "Success", user: data })
          } else {
            res.send({ status: 0, message: "Wrong password" })
          }
        } else {
          res.send({ status: 0, message: "User not found" })
        }
      }
    }
  )
}

exports.apiChangePassword = (req, res) => {
  user.findById(req.body.authenticatedId, (error, doc) => {
    if (error) res.send({ status: 0, error })
    else if (!doc) res.send({ status: 0, message: "User not found" })
    else {
      if (bcrypt.compareSync(req.body.old_password, doc.password)) {
        doc.password = bcrypt.hashSync(req.body.new_password, salt)
        doc.save(error => {
          if (error) res.send({ status: 0, error })
          else res.send({ status: 1, message: "Password changed" })
        })
      } else res.send({ status: 0, message: "Invalid old password" })
    }
  })
}

exports.apiUpdate = (req, res) => {
  user.findById(req.body.authenticatedId, (error, doc) => {
    if (error) res.send({ status: 0, error })
    else if (!doc) res.send({ status: 0, message: "User not found" })
    else {
      doc.username = req.body.username
      doc.email = req.body.email
      doc.save(error => {
        if (error) res.send({ status: 0, error })
        else res.send({ status: 1, message: "Data updated" })
      })
    }
  })
}
