const db = require('../db');


exports.findAllProducts = (tag) => {
    try {
        const query = `
            SELECT *
            FROM products
            WERE tag = ${tag}`;
        const { rows } = db.query(query);
        return rows || [];
    } catch (error) {
        console.log(error)
    }
}
