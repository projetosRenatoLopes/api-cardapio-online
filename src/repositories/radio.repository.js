const { dbradio } = require('../dbradio')
var jwt = require('jsonwebtoken');
const { verifyJWT } = require('../utils/checkToken');

exports.getSession = async (req, res, next) => {
    try {
        const user = req.body.user
        const pass = req.body.password

        const result = await dbradio.query("SELECT name, id FROM users WHERE nickname = '" + user + "' AND pass = '" + pass + "';");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(204).send();
        } else {
            const name = queryRes[0].name;
            const id = queryRes[0].id;
            const secret = process.env.SECRET_KEY

            var token = jwt.sign({ id }, secret, {
                expiresIn: 604800 // 7 dias
            });

            const dataUser = {
                "name": name,
                "id": id,
                "token": token,
                "nickname": req.body.user
            }
            return res.status(200).send(dataUser);
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
            const user = await dbradio.query("SELECT name, id from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {                
                // return res.status(200).send({ "status": 200, "user": "Produto inserido com sucesso" });
                return res.status(200).send({ "status": 200, "id": user.rows[0].id, "user": user.rows[0].name, });

            }
        }

    } catch (error) {
        return res.status(error.code).send({ "status": error.code, 'message': error.message });
    }
}

exports.updateUser = async (req, res, next) => {

    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const result = await dbradio.query("SELECT * from users WHERE id = '" + vToken.id + "' and pass = '" + [req.body[0].pass] + "';");
                if (result.rowCount === 0) {
                    return res.status(401).send({ "status": 401, "message": "Senha ou ID incorretos." });
                } else {
                    await dbradio.query("UPDATE users SET name = '" + [req.body[0].name] + "', pass = '" + [req.body[0].newpass] + "' WHERE id = '" + [req.body[0].id] + "';");
                    return res.status(200).send({ "status": 200, "message": "Usuário alterado com sucesso", "user": [req.body[0].name] });
                }
            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.getPosts = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const result = await dbradio.query("SELECT P.uuid, P.post, P.likes, P.date, U.nickname, U.name FROM posts P INNER JOIN users U ON P.iduser = U.id;");
                const users = await dbradio.query("SELECT id, name, nickname FROM users;");
                
                if (result.rowCount === 0) {
                    return res.status(204).send({ "status": 204, "message": "Nenhum post." });
                } else {
                    return res.status(200).send({ "status": 200, "posts": [result.rows], "users":[users.rows] });
                }
            }
        }
    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }
}

exports.like = async (req, res, next) => {    
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {                        
                
                    await dbradio.query("UPDATE posts SET likes = '" + [req.body.likes] + "' WHERE uuid = '" + [req.body.id] + "';");
                    return res.status(200).send({ "status": 200, "message": "you like post", "userId": [req.body.id] });
                
            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.sendPost = async (req, res, next) => {    
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {                        
                
                const post = await dbradio.query("INSERT INTO posts (iduser, post, date) VALUES ('" + [vToken.id] + "','" + [req.body.post] + "','" + Date.now() + "');");                
                return res.status(200).send({ "status": 200, "message": "you send a post", "userId": [vToken.id] });
                
            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}