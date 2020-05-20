const bcrypt = require("bcryptjs")
const pasien = require("../models/pasienCovid")
const user = require("../models/user")
const globalCovid = require("../models/covidGlobal")

exports.createPasien = async (req, res) => {
  let salt = bcrypt.genSaltSync(10)
  const { username, email, username_pendamping, email_pendamping } = req.body
  const password = bcrypt.hashSync(username, salt)
  const password_pendamping = bcrypt.hashSync(username_pendamping, salt)
  const user_pasien = await user.create({
    email,
    username,
    password,
    role: "0"
  })
  const user_pendamping = await user.create({
    email: email_pendamping,
    username: username_pendamping,
    password: password_pendamping,
    role: "1"
  })
  pasien.create(
    {
      id_user: user_pasien._id,
      pendamping: user_pendamping._id,
      ...req.body
    },
    err => {
      if (err) res.send({ err })
      else res.redirect("/page/pasien-covid-page")
    }
  )
}

exports.getProfile = (req, res) => {
  pasien.findOne({ id_user: req.body.authenticatedId }, (error, doc) => {
    if (error) res.send({ status: 0, error })
    else res.send({ status: 1, data: doc })
  })
}

exports.findAllPasien = (req, res) => {
  pasien.find((err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findPasienById = (req, res) => {
  pasien.findById(req.params.id, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: [doc] })
    }
  })
}

exports.updatePasienById = (req, res) => {
  pasien.findOneAndUpdate(
    { _id: req.body._id },
    {
      ...req.body
    },
    { new: true },
    (err, doc) => {
      if (err) res.send({ err })
      else {
        res.redirect("/page/pasien-covid-page")
      }
    }
  )
}

exports.apiUpdatePasienById = (req, res) => {
  pasien.findOneAndUpdate(
    { _id: req.body._id },
    {
      ...req.body
    },
    { new: true },
    (err, doc) => {
      if (err) res.send({ status: 0, err })
      else {
        res.send({ status: 1, data: doc })
      }
    }
  )
}

exports.findAllPasienByJenis = (req, res) => {
  if (err) res.send({ err })
  else {
    res.send(doc)
  }
}

exports.findAllPasienPDP = (req, res) => {
  pasien.find({ kategori: "PDP" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienODP = (req, res) => {
  pasien.find({ kategori: "ODP" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienOTG = (req, res) => {
  pasien.find({ kategori: "OTG" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienSembuh = (req, res) => {
  pasien.find({ status_sembuh: "Sembuh" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienPositif = (req, res) => {
  pasien.find({ kategori: "Positif" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienMeninggal = (req, res) => {
  pasien.find({ status_hidup: "Meninggal" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findAllPasienHidup = (req, res) => {
  pasien.find({ status_hidup: "Hidup" }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

exports.findPasienByPendamping = (req, res) => {
  pasien.find({ pendamping: req.body.authenticatedId }, (err, doc) => {
    if (err) res.send({ status: 0, err })
    else {
      res.send({ status: 1, data: doc })
    }
  })
}

// Find Pasien Global
// router.get("/findAllPasienGlobal",isAuth,pasienController.findAllPasienGlobal);
exports.findAllPasienGlobal = (req, res) => {
  globalCovid.findOne((err, doc) => {
    res.send(doc)
  })
}

exports.updateAllPasienGlobal = (req, res) => {
  globalCovid.updateOne(
    {},
    {
      positif: req.body.positif,
      pdp: req.body.pdp,
      odp: req.body.odp,
      otg: req.body.otg,
      sembuh: req.body.sembuh,
      meninggal: req.body.meninggal
    },
    { new: true },
    (err, doc) => {
      res.send(doc)
    }
  )
}

exports.createAllPasienGlobal = (req, res) => {
  globalCovid.create(req.body, (err, doc) => {
    if (err) {
      res.send(err)
    }
    res.send(doc)
  })
}

exports.deletePasienById = (req, res) => {
  pasien.deleteOne({ _id: req.body.id }, (err, doc) => {
    if (err) res.send({ err })
    else {
      res.send({
        msg: "Success",
        doc: doc
      })
    }
  })
}
