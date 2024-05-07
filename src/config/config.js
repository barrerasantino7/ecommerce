const dotenv = require("dotenv");
const program = require("../utils/commander.js");

const {mode} = program.opts();

dotenv.config({
    path: mode === "desarrollo"?"./.env.desarrollo":"./.env.produccion"
})

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;