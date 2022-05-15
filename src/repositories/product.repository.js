const { db } = require('../db')


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
