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
            } else if (user.rows[0].tagpage === req.body[0].tagprod)  {            
                const result = await db.query("INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('" + [req.body[0].nameprod] + "','" + [req.body[0].priceprod] + "','" + [req.body[0].imgprod] + "','" + [req.body[0].descprod] + "','" + [req.body[0].categprod] + "','" + [req.body[0].tagprod] + "');");
                return res.status(200).send({ "status": 200, "message": "Produto inserido com sucesso" });

            } else {
                return res.status(401).send({ "status": 401, "message": "Usuário sem permissão" });
            }
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.updateProduct = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await db.query("SELECT tagpage, name from users WHERE uuid = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else if (user.rows[0].tagpage === req.body[0].tagprod)  {            
                const result = await db.query("UPDATE products SET nomeprod = '" + [req.body[0].nameprod] + "', preco = '" + [req.body[0].priceprod] + "', img = '" + [req.body[0].imgprod] + "', ingr = '" + [req.body[0].descprod] + "', categ = '" + [req.body[0].categprod] + "' WHERE uuid = '" + [req.body[0].id] + "';");
                return res.status(200).send({ "status": 200, "message": "Produto alterado com sucesso" });

            } else {
                return res.status(401).send({ "status": 401, "message": "Usuário sem permissão." });
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}