const { db } = require('../db')


exports.findAllProducts = async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM products WHERE tagcompany = '" + [req.params.company] + "';");
        const queryRes = result.rows;
        var response = { products: 'Erro ao consultar produtos' }
        if (queryRes.length === 0) {
            response = { products: 'Nenhum produto encontrado para ' + [req.params.company] + '.' }
        } else {
            response = [{ length: result.rows.length, products: result.rows }]
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}
