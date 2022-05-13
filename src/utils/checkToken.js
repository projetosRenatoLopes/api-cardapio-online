var jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

function verifyJWT(token) {
    //req.headers['x-access-token']
    console.log(token)
    var resposta = { status: 204, auth: false, message: 'Erro ao verificar Token.' };
    if (!token) {
        console.log('401')
        resposta = { status: 401, auth: false, message: 'Token não informado.' };
    } else {

        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                console.log('500')
                resposta = { status: 500, auth: false, message: 'Token inválido.' };
            } else {
                console.log('200')
                
                resposta =  ({ "status": 200, "auth": true, "message": 'Token válido', "id": decoded.id });
            }
        });
    }
    return resposta
}

exports.verifyJWT = verifyJWT;