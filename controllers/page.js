const kebutuhan = require("../models/kebutuhan")
const pasienCovid = require("../models/pasienCovid")
const dokter = require("../models/dokter")
const records = require("../models/records")
const emergency = require("../models/emergency")

// Auth Page
exports.loginPage = (req, res) => {
  let fail_message = req.flash("error")
  let success_message = req.flash("success")
  if (fail_message.length > 0) {
    fail_message = fail_message[0]
  } else {
    fail_message = null
  }
  if (success_message.length > 0) {
    success_message = success_message[0]
  } else {
    success_message = null
  }
  res.render("auth/login", {
    fail_message: fail_message,
    success_message: success_message
  })
}

exports.registerPage = (req, res) => {
  let fail_message = req.flash("error")
  let success_message = req.flash("success")
  if (fail_message.length > 0) {
    fail_message = fail_message[0]
  } else {
    fail_message = null
  }
  if (success_message.length > 0) {
    success_message = success_message[0]
  } else {
    success_message = null
  }
  res.render("auth/register", {
    fail_message: fail_message,
    success_message: success_message
  })
}

exports.passwordRecovery = (req, res) => {
  res.render("auth/password")
}

// Pasien Page
exports.pasienMdrTbPage = (req, res) => {
  pasienTBC.find((err, doc) => {
    if (err) res.send(err)
    res.render("pasien/pasien-mdr", {
      title: "TBC",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc
    })
  })
}

exports.pasienCovidPage = (req, res) => {
  pasienCovid
    .find()
    .populate("dokter", "nama_lengkap")
    .exec((err, doc) => {
      if (err) res.send(err)
      res.render("pasien/pasien-covid", {
        title: "COVID-19",
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
        data: doc
      })
    })
}

exports.tambahPasienMdrTbPage = (req, res) => {
  res.render("pasien/tambah-mdr", {
    title: "Tambah TBC",
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username
  })
}

exports.tambahPasienCovidPage = async (req, res) => {
  const doctors = await dokter.find()
  res.render("pasien/tambah-covid", {
    title: "Tambah COVID-19",
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    doctors
  })
}

// Detail Pasien
exports.pasienTbDetailPage = (req, res) => {
  pasienTBC.findById(req.params.id, (err, doc) => {
    console.log(doc)
    res.render("detail/detail-pasien-tb", {
      title: "Detail Pasien TBC",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc
    })
  })
}

exports.pasienCovidDetailPage = async (req, res) => {
  pasienCovid.findById(req.params.id, (err, doc) => {
    res.render("detail/detail-pasien-covid", {
      title: "Detail Pasien COVID-19",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc,
      apiMap: process.env.API_KEY,
      hostMap: process.env.HOST
    })
  })
}

// Edit
exports.editPasienTBC = (req, res) => {
  pasienTBC.findById(req.params.id, (err, doc) => {
    console.log(doc)
    res.render("edit/edit-pasien-tbc", {
      title: "Edit Pasien TBC",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc
    })
  })
}

exports.editPasienCOVID = async (req, res) => {
  const doctors = await dokter.find()
  pasienCovid.findById(req.params.id, (err, doc) => {
    res.render("edit/edit-pasien-covid", {
      title: "Detail Pasien Covid-19",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc,
      doctors
    })
  })
}

exports.editSettings = (req, res) => {
  pasienTBC.findById(req.params.id, (err, doc) => {
    res.render("edit/detail-settings", {
      title: "Edit Settings",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      data: doc
    })
  })
}

// Dashboard
// https://covid-monitoring2.kemkes.go.id/summary/provinces
exports.covidPage = async (req, res) => {
  // kondisi
  let dataBatuk = await pasienCovid.find({ batuk: "iya" })
  let dataLemas = await pasienCovid.find({ lemas: "iya" })
  let dataMual = await pasienCovid.find({ mual: "iya" })
  let dataPusing = await pasienCovid.find({ pusing: "iya" })
  let dataDemam = await pasienCovid.find({ demam: "iya" })
  let dataSesak = await pasienCovid.find({ sesak: "iya" })

  //kategori
  let dataPDP = await pasienCovid.find({ kategori: "PDP" })
  let dataPositif = await pasienCovid.find({ kategori: "Positif" })
  let dataODP = await pasienCovid.find({ kategori: "ODP" })
  let dataOTG = await pasienCovid.find({ kategori: "OTG" })

  // status hidup
  let dataHidup = await pasienCovid.find({ status_hidup: "Hidup" })
  let dataMeninggal = await pasienCovid.find({ status_hidup: "Meninggal" })
  let dataEmergency = await emergency.find({})

  pasienCovid
    .find()
    .populate("dokter", "nama_lengkap")
    .exec((err, doc) => {
      console.log(doc)
      res.render("dashboard/covid-19", {
        title: "COVID-19",
        username: req.session.username,
        isLoggedIn: req.session.isLoggedIn,
        data: doc,
        zone: {
          lat: -3.042884,
          long: 104.283449
        },
        apiMap: process.env.API_KEY,
        hostMap: process.env.HOST,
        dataBatuk: dataBatuk,
        dataLemas: dataLemas,
        dataMual: dataMual,
        dataPusing: dataPusing,
        dataDemam: dataDemam,
        dataSesak: dataSesak,
        dataPositif: dataPositif,
        dataPDP: dataPDP,
        dataODP: dataODP,
        dataOTG: dataOTG,
        dataHidup: dataHidup,
        dataMeninggal: dataMeninggal,
        dataEmergency: dataEmergency
      })
    })
}

exports.mdrTbPage = async (req, res) => {
  records.find(
    {
      status: "Belum Minum",
      time: new Date().toLocaleDateString()
    },
    (err, data) => {
      pasienTBC.find((err, doc) => {
        res.render("dashboard/mdr-tb", {
          title: "MDR-TB",
          username: req.session.username,
          isLoggedIn: req.session.isLoggedIn,
          data: data,
          pasien: doc,
          zone: {
            lat: -3.042884,
            long: 104.283449
          },
          apiMap: process.env.API_KEY,
          hostMap: process.env.HOST
        })
      })
    }
  )
}

// Lokasi Page
exports.lokasiPage = (req, res) => {
  pasienCovid.find((err, doc) => {
    res.render("recordpasien/lokasi", {
      title: "Lokasi",
      username: req.session.username,
      isLoggedIn: req.session.isLoggedIn,
      data: doc,
      zone: {
        lat: -3.042884,
        long: 104.283449
      },
      apiMap: process.env.API_KEY,
      hostMap: process.env.HOST
    })
  })
}

exports.trackRecordPage = (req, res) => {
  records.find((err, doc) => {
    console.log(doc)
    res.render("recordpasien/record", {
      title: "Record",
      username: req.session.username,
      isLoggedIn: req.session.isLoggedIn,
      data: doc,
      zone: {
        lat: -3.042884,
        long: 104.283449
      },
      apiMap: process.env.API_KEY,
      hostMap: process.env.HOST
    })
  })
}

exports.kebutuhanPage = (req, res) => {
  const request = require("request")
  let title = "Kebutuhan APD"
  let jenis = "APD"
  let locations = request(
    "https://covid-monitoring2.kemkes.go.id/summary/provinces",
    function(error, response, body) {
      return body
    }
  )
  if (req.params.butuh === "apd") {
    title = "Kebutuhan APD"
  } else if (req.params.butuh === "makanan") {
    title = "Kebutuhan Makanan"
    jenis = "Makanan"
  } else {
    title = "Kebutuhan Alkes"
    jenis = "Alkes"
  }
  kebutuhan.find({ jenis: jenis }, (err, doc) => {
    console.log(doc)
    let jumlah_titik = doc.length
    res.render("kebutuhan", {
      title: title,
      locations: locations,
      jenis: jenis,
      username: req.session.username,
      isLoggedIn: req.session.isLoggedIn,
      kebutuhan: doc,
      jumlah_titik: jumlah_titik,
      zone: {
        lat: -3.042884,
        long: 104.283449
      }
    })
  })
}

exports.emergencyPage = (req, res) => {
  emergency.find((err, doc) => {
    res.render("emergency/emergency", {
      title: "Emergency",
      data: doc,
      username: req.session.username,
      isLoggedIn: req.session.isLoggedIn,
      zone: {
        lat: -3.042884,
        long: 104.283449
      },
      apiMap: process.env.API_KEY,
      hostMap: process.env.HOST
    })
  })
}

exports.tambahEmergencyPage = (req, res) => {
  emergency.find((err, doc) => {
    res.render("emergency/tambah-emergency", {
      title: "Tambah Emergency",
      data: doc,
      username: req.session.username,
      isLoggedIn: req.session.isLoggedIn,
      zone: {
        lat: -3.042884,
        long: 104.283449
      },
      apiMap: process.env.API_KEY,
      hostMap: process.env.HOST
    })
  })
}

exports.kabupatenPage = (req, res) => {
  const request = require("request")
  let locations = request(
    "https://covid-monitoring2.kemkes.go.id/summary/provinces",
    function(error, response, body) {
      return body
    }
  )
  res.render("kabupaten", {
    kota: req.params.kota,
    locations: locations,
    username: req.session.username,
    isLoggedIn: req.session.isLoggedIn,
    zone: {
      lat: -3.042884,
      long: 104.283449
    }
  })
}
