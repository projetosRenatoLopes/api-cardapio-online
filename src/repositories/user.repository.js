const { db } = require('../db')
var jwt = require('jsonwebtoken');
const { verifyJWT } = require('../utils/checkToken');

exports.getSession = async (req, res, next) => {
    try {
        const user = req.body.user
        const pass = req.body.password
        const tag = req.body.page

        const result = await db.query("SELECT name, uuid, tagpage FROM users WHERE nickname = '" + user + "' AND pass = '" + pass + "';");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(204).send();
        } else if (queryRes[0].tagpage === tag) {
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
        } else {
            return res.status(401).send({ "status": 400, "message": "Acesso negado", "name": queryRes[0].name });
        }


    } catch (error) {
        return res.status(500).send({ "status": 500, 'message': error.message });
    }
}

exports.validToken = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "status": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "status": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await db.query("SELECT tagpage, name from users WHERE uuid = '" + vToken.id + "';")
            console.log(req)
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else if (user.rows[0].tagpage === req.body.tagprod)  {            
                
                // return res.status(200).send({ "status": 200, "user": "Produto inserido com sucesso" });
                return res.status(200).send({"status": 200, "user": user.rows[0].name});

            } else {
                return res.status(401).send({ "status": 401, "message": "Usuário sem permissão" });
            }
        }

    } catch (error) {
        return res.status(error.code).send({ "status": error.code, 'message': error.message });
    }
}