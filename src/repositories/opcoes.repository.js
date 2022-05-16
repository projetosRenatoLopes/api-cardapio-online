const { db } = require('../db')
var jwt = require('jsonwebtoken');
const { verifyJWT } = require('../utils/checkToken');

exports.getCategories = async (req, res, next) => {
    try {
            const result = await db.query("SELECT name AS desc, id FROM categories ORDER BY name;");
            const queryRes = result.rows;
            return res.status(200).send(queryRes)
    } catch (error) {
        return res.status(500).send('ERROR 500');
    }
}

exports.getPaymentModes = async (req, res, next) => {
    try {
            const result = await db.query("SELECT id, name AS desc FROM paymentsmodes ORDER BY id;");
            const queryRes = result.rows;
            return res.status(200).send(queryRes)
    } catch (error) {
        return res.status(500).send('ERROR 500');
    }
}