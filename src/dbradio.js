const { Pool } = require('pg');

const connectionString = process.env.CONNECTION_STRING_RADIO;

const dbradio = new Pool({ connectionString });

exports.dbradio = dbradio;