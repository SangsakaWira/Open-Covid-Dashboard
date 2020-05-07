const fs = require("fs")
const express = require("express")
const session = require("express-session")
const app = express()
const mongoose = require("mongoose")
const MongoDBStore = require("connect-mongodb-session")(session)
const path = require("path")
const bodyParser = require("body-parser")
// const csrf = require('csurf');
const flash = require("connect-flash")
const cron = require("node-cron")
const cors = require("cors")

require("dotenv").config()

const port = process.env.PORT || 3000

const URI = "mongodb://localhost/audiometer-online"

const userRouter = require("./routes/user")
const pageRouter = require("./routes/page")
const kebutuhanRouter = require("./routes/kebutuhan")
const pasienCovidRouter = require("./routes/pasienCOVID")
const emergencyRouter = require("./routes/emergency")

const records = require("./models/records")
const pasien = require("./models/pasienCovid")

const errorController = require("./controllers/error")

const store = new MongoDBStore({
  uri: URI,
  collection: "sessions"
})

app.use(cors())

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
)

cron.schedule("* * * * * *", function() {
  let current_time = new Date().getHours()
  let current_minute = new Date().getMinutes()
  let current_second = new Date().getSeconds()
  let current_day = new Date().getDate()
  let current_month = new Date().getMonth()
  let current_year = new Date().getFullYear()
  if ((current_time === 7) & (current_minute === 40) & (current_second === 0)) {
    pasien.find((err, doc) => {
      if (err) res.send({ msg: err })
      for (let i = 0; i < doc.length; i++) {
        records.create(
          {
            time: new Date().toLocaleDateString(),
            id_pasien: doc[i]._id,
            pasien_name: doc[i].nama,
            pmo: doc[i].pmo,
            no_hp: doc[i].no_hp,
            no_hp_pmo: doc[i].no_hp_pmo,
            dokter: doc[i].dokter
          },
          (err, doc) => {
            if (err) console.log(err)
            console.log({
              msg: "Record Created",
              doc: doc
            })
          }
        )
      }
    })
  }
})

app.use("/required", express.static("required"))
app.use(express.static(__dirname))
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.redirect("/page/covid-19")
})

// Swagger UI
app.get("/docs", (req, res) => {
  res.sendFile("views/swagger-ui/index.html", { root: __dirname })
})

app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs")

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use("/user", userRouter)
app.use("/page", pageRouter)
app.use("/kebutuhan", kebutuhanRouter)
app.use("/pasienCovid", pasienCovidRouter)
app.use("/emergency", emergencyRouter)

// app.get("/500", errorController.get500)

app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   res.redirect("/500")
// })

app.listen(port, (req, res) => {
  console.log("Server is running!")
})
