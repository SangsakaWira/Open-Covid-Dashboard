const apiKey = process.env.API_ACCESS_KEY

exports.apiMiddleware = (req, res, next) => {
  if (apiKey) {
    const apiKeyHeader = req.header("API-Key")
    if (apiKeyHeader) {
      if (apiKeyHeader === apiKey) next()
      else res.send({ status: 0, message: "Invalid token" })
    } else res.send({ status: 0, message: "No token provided" })
  } else {
    res.send({
      status: 0,
      message:
        "Set up your API_ACCESS_KEY on .env, you can get it from the devs"
    })
  }
}
