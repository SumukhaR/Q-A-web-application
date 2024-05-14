const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const indexRoute = require("./routes/index")

const connectDatabase = require("./helpers/database/connectDatabase")

dotenv.config({
    path: './Config/config.env'
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use("/", indexRoute)



const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    connectDatabase()
    console.log(`server running on port ${PORT}`)
})

process.on("unhandledRejection", (err, promise) => {

    console.log(`Logged error: ${err}`)

    server.close(() => process.exit(1))
})