const { dbradio } = require('../dbradio')
var jwt = require('jsonwebtoken');
const { verifyJWT } = require('../utils/checkToken');
const { db } = require('../db');

exports.getSession = async (req, res, next) => {
    try {
        const user = req.body.user
        const pass = req.body.password
        const result = await dbradio.query("SELECT name, id, avatar FROM users WHERE nickname = '" + user + "' AND pass = '" + pass + "';");
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
                "nickname": req.body.user,
                "avatar": result.rows[0].avatar
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
        else if (vToken.status === 204) { return res.status(204).send({ "status": 204, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name, id, nickname, avatar from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                return res.status(200).send({ "status": 200, "id": user.rows[0].id, "user": user.rows[0].name, "nickname": user.rows[0].nickname, 'avatar': user.rows[0].avatar });
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

exports.updateImgUser = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const result = await dbradio.query("SELECT * from users WHERE id = '" + vToken.id + "';");
                if (result.rowCount === 0) {
                    return res.status(401).send({ "status": 401, "message": "Usuário não encontrado." });
                } else {
                    await dbradio.query("UPDATE users SET avatar = '" + [req.body[0].avatar] + "' WHERE id = '" + vToken.id + "';");
                    return res.status(200).send({ "status": 200, "message": "Imagem do usuário alterada com sucesso", "idUser": vToken.id });
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
        else if (vToken.status === 204) { return res.status(204).send({ "error": 204, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {

                //const result = await dbradio.query("SELECT P.uuid, P.post, P.likes, P.date, U.nickname, U.name FROM posts P INNER JOIN users U ON P.iduser = U.id;");
                const result = await dbradio.query("SELECT P.uuid, P.post, P.likes, P.date, P.havemedia, U.nickname, U.name, U.avatar, M.media, M.type FROM posts P INNER JOIN users U ON P.iduser = id  LEFT JOIN media M ON M.id = P.media;");
                const users = await dbradio.query("SELECT id, name, nickname, avatar FROM users;");
                const comments = await dbradio.query('SELECT C.id, C.iduser, C.idpost, C.comment, C.likes, C.date, U.name, U.avatar FROM comments C INNER JOIN users U ON U.id = C.iduser ORDER BY C.date DESC;');
                var postsReturn = [];
                result.rows.forEach(element => {
                    var commentsPost = []
                    comments.rows.forEach(comment => {
                        if (element.uuid === comment.idpost) {
                            commentsPost.push(comment)
                        }
                    });
                    postsReturn.push({ "avatar": element.avatar, "date": element.date, "likes": element.likes, "name": element.name, "nickname": element.nickname, "post": element.post, "uuid": element.uuid, "comments": commentsPost, "havemedia": element.havemedia, "media": element.media, "typemedia": element.type })
                    //                     newElement.push(commentsPost)
                    //newElement.push(commentsPost)
                    // postsReturn.push(element) 
                });

                if (result.rowCount === 0) {
                    return res.status(204).send({ "status": 204, "message": "Nenhum post." });
                } else {
                    return res.status(200).send({ "status": 200, "posts": postsReturn, "users": [users.rows] });
                }
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
        else if (vToken.status === 204) { return res.status(204).send({ "error": 204, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const likes = []
                const newLikes = likes.join(',')
                if (req.body.havemedia === true) {                    
                    const dateNow = Date.now();
                    await dbradio.query("INSERT INTO media (iduser, media, type, date) VALUES ('" + [vToken.id] + "','" + [req.body.media] + "','" + [req.body.typemedia] + "','" + dateNow + "');");
                    const mediaId = await dbradio.query("SELECT id FROM media WHERE date='" + dateNow + "' AND iduser='" + [vToken.id] + "';");
                    const post = await dbradio.query("INSERT INTO posts (iduser, post, likes, date, havemedia, media) VALUES ('" + [vToken.id] + "','" + [req.body.post] + "','" + newLikes + "','" + dateNow + "','" + true + "','" + mediaId.rows[0].id + "');");
                    return res.status(200).send({ "status": 200, "message": "you send a post with media ", "userId": [vToken.id] });
                } else {
                    const post = await dbradio.query("INSERT INTO posts (iduser, post, likes, date, havemedia, media) VALUES ('" + [vToken.id] + "','" + [req.body.post] + "','" + newLikes + "','" + Date.now() + "','" + false + "','" + null + "');");
                    return res.status(200).send({ "status": 200, "message": "you send a post with media ", "userId": [vToken.id] });
                }
                //const post = await dbradio.query("INSERT INTO posts (iduser, post, likes, date) VALUES ('" + [vToken.id] + "','" + [req.body.post] + "','" + newLikes + "','" + Date.now() + "');");

            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.sendComment = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 204) { return res.status(204).send({ "error": 204, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const likes = []
                const newLikes = likes.join(',')
                const post = await dbradio.query("INSERT INTO comments (iduser, idpost, comment, likes, date) VALUES ('" + [vToken.id] + "','" + [req.body.idpost] + "','" + [req.body.comment] + "','" + newLikes + "','" + Date.now() + "');");
                return res.status(200).send({ "status": 200, "message": "you send a post", "userId": [vToken.id] });

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
        else if (vToken.status === 204) { return res.status(204).send({ "error": 204, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await dbradio.query("SELECT name from users WHERE id = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                const likesPost = await dbradio.query("SELECT likes FROM posts WHERE uuid = '" + [req.body.id] + "';");
                if (likesPost.rowCount === 0) {
                    return res.status(404).send({ "status": 404, "message": "Post não encontrado." });
                } else {
                    const likes = likesPost.rows[0].likes;
                    var postLikes = likes.split(','), newLikes = [], liked = false, userId = vToken.id;
                    if (likes !== null && likes !== "" && likes !== undefined) {
                        newLikes = postLikes
                        postLikes.forEach(element => {
                            if (element === userId) {
                                liked = true;
                            }
                        });
                    }
                    if (req.body.action === 'like') {                        
                        if (liked === false) {
                            newLikes.push(userId)
                        }
                    } else {
                        if (liked !== false) {
                            if (postLikes.length === 1) {
                                if (postLikes[0] === userId) {
                                    newLikes = [];
                                }
                            } else {
                                var removedLike = [];
                                postLikes.forEach(element => {
                                    if (element !== userId) {
                                        removedLike.push(element);
                                    }
                                });
                                newLikes = removedLike;
                            }
                        }
                    }

                    newLikes = newLikes.join(',')
                    await dbradio.query("UPDATE posts SET likes = '" + newLikes + "' WHERE uuid = '" + [req.body.id] + "';");
                    return res.status(200).send({ "status": 200, "message": "you " + req.body.action + " post", "userId": [req.body.id] });
                }


            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.getLink = async (req, res, next) => {
    try {
        const result = await dbradio.query("SELECT link FROM linkradio WHERE onlive = 'noar';");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(200).send('');
        } else {
            return res.status(200).send(queryRes[0].link);
        }
    } catch (error) {
        return res.status(500).send({ "status": 500, 'message': error.message });
    }
}

exports.getLinks = async (req, res, next) => {
    try {
        const result = await dbradio.query("SELECT * FROM linkradio ORDER BY name;");
        const queryRes = result.rows;
        if (queryRes.length === 0) {
            return res.status(200).send('');
        } else {
            return res.status(200).send(queryRes);
        }
    } catch (error) {
        return res.status(500).send({ "status": 500, 'message': error.message });
    }
}

exports.setLinks = async (req, res, next) => {
    try {
        await dbradio.query("UPDATE linkradio SET onlive='" + Date.now() + "' where onlive='noar';");
        await dbradio.query("UPDATE linkradio SET onlive='noar' where id='" + [req.body.id] + "';");
        return res.status(200).send('');
    } catch (error) {
        return res.status(500).send({ "status": 500, 'message': error.message });
    }
}

exports.newLink = async (req, res, next) => {
    try {
        await dbradio.query("INSERT INTO linkradio (name, link, onlive) VALUES ('" + [req.body.nome] + "','" + [req.body.link] + "','" + Date.now() + "');");
        return res.status(200).send('');
    } catch (error) {
        return res.status(401).send({ "status": 401, 'message': error.message });
    }
}

exports.sql = async (req, res, next) => {
    const queryExecute = JSON.stringify(req.body.sql)
    try {
        const vToken = req.headers.authorization
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await db.query("SELECT name from login WHERE uuid = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                await dbradio.query(req.body.sql);
                return res.status(200).send();
            }
        }

    } catch (error) {
        return res.status(400).send(error);
    }
}
