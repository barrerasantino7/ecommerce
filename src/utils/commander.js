const {Command} = require("commander");
const program = new Command();

program
    .option("-p <port>", "Puerto en la que se inicia el servidor", 8080)
    .option("--mode <mode>", "Modo de trabajo", "Produccion")
program.parse();

module.exports = program;