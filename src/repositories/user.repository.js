const { password } = require('pg/lib/defaults');
const { db } = require('../db')

exports.getSession = async (req, res, next) => {
    try {
        const user = req.body.user
        const pass = req.body.password
        
        const result = await db.query("SELECT name FROM login WHERE nickname = '" + user + "' AND pass = '" + pass + "';");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(204).send();
        } else {
            const name = queryRes[0].name;
            return res.status(200).send(`${queryRes[0].name}`);
        }

    } catch (error) {
        return res.status(500).send('ERROR 500');
    }
}