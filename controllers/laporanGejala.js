const LaporanGejala = require("../models/laporanGejala")
const PasienCovid = require("../models/pasienCovid")

exports.create = async (req, res) => {
  const patient = await PasienCovid.findOne({
    id_user: req.body.authenticatedId
  })
  if (patient) {
    LaporanGejala.create(
      { id_pasien: patient._id, ...req.body },
      (error, doc) => {
        if (error) res.send({ status: 0, error })
        else res.send({ status: 1, message: "Succes" })
      }
    )
  } else res.send({ status: 0, message: "Invalid user" })
}

exports.findByIdPasien = async (req, res) => {
  const patient = await PasienCovid.findOne({
    id_user: req.body.authenticatedId
  })
  LaporanGejala.find({ id_pasien: patient._id }, (err, docs) => {
    if (err) res.send({ err })
    else {
      res.send({
        status: 1,
        data: docs
      })
    }
  })
}

exports.findById = async (req, res) => {
  const patient = await PasienCovid.findOne({
    id_user: req.body.authenticatedId
  })
  if (patient) {
    LaporanGejala.findOne(
      { id_pasien: patient._id, _id: req.body.id },
      (err, doc) => {
        if (err) res.send({ err })
        else {
          res.send({
            status: 1,
            data: doc
          })
        }
      }
    )
  } else res.send({ status: 0, message: "Invalid user" })
}
