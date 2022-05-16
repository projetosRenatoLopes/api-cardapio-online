const { db } = require('../db');
const { verifyJWT } = require('../utils/checkToken');


exports.findAllProducts = async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM products WHERE tagcompany = '" + [req.params.company] + "';");
        const queryRes = result.rows;
        var response = [{ length: 0, products: ['Erro ao consultar produtos'] }]
        if (queryRes.length === 0) {
            response = [{ length: 0, products: ['Nenhum produto encontrado para ' + [req.params.company] + '.'] }]
        } else {
            // @ts-ignore
            response = [{ length: result.rows.length, products: result.rows }]
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.insertProduct = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await db.query("SELECT tagpage, name from users WHERE uuid = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                
                const result = await db.query("INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('" + [req.body.nameprod] + "','" + [req.body.priceprod] + "','" + [req.body.imgprod] + "','" + [req.body.descprod] + "','" + [req.body.categprod] + "','" + [req.body.tagprod] + "');");
                return res.status(200).send({ "status": 200, "message": "Produto inserido com sucesso" });

            } 
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}