const { db } = require('../db')
var jwt = require('jsonwebtoken');

exports.getSession = async (req, res, next) => {
    try {
        const user = req.body.user
        const pass = req.body.password

        const result = await db.query("SELECT name, uuid FROM login WHERE nickname = '" + user + "' AND pass = '" + pass + "';");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(204).send();
        } else {
            const name = queryRes[0].name;
            const id = queryRes[0].uuid;
            const secret = process.env.SECRET_KEY

            var token = jwt.sign({ id }, secret, {
                expiresIn: 10800 // 5min 
            });

            const dataUser = {
                "name": name,
                "id": id,
                "token": token
            }
            return res.status(200).send(dataUser);
        }

    } catch (error) {
        return res.status(500).send('ERROR 500');
    }
}