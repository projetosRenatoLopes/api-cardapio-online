"select name, id from categories order by name;"

const { db } = require('../db')
var jwt = require('jsonwebtoken');
const { verifyJWT } = require('../utils/checkToken');

exports.getCategories = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const vToken = verifyJWT(token)

        if (vToken.status === 401) {

            return res.status(401).send(vToken.message)

        } else if (vToken.status === 500) {

            return res.status(500).send(vToken.message)

        } else if (vToken.status === 200) {
            const result = await db.query("select name as desc, id from categories order by name;");
            const queryRes = result.rows;
            return res.status(200).send(queryRes)
        }

    } catch (error) {
        return res.status(500).send('ERROR 500');
    }
}