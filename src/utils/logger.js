const winston = require("winston");

const loggerConfig ={
    levels:{
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    },
    color:{
        debug: "white",
        http: "magenta",
        info: "green",
        warning: "blue",
        error: "yellow",
        fatal: "red"
    }
};

const loggerDesarrollo = winston.createLogger({
    levels: loggerConfig.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors:loggerConfig.color}),
                winston.format.simple()
            )
        })
    ]
});

const loggerProduction = winston.createLogger({
    levels: loggerConfig.levels,
    transports:[
        new winston.transports.Console({
            level:"debug",
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename: "./error.log",
            level:"error",
            format: winston.format.simple()
        })
    ]
});

const logger = process.env.mode === "produccion" ? loggerProduction : loggerDesarrollo;

module.exports = logger;