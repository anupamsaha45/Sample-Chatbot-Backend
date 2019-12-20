const env = process.env.NODE_ENV || "development";

const Config = require( `./environments/${ env.toLowerCase() }` );

module.exports = Config;
