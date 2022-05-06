
const { db } = require('../db')

exports.findAllCompany = async (req, res, next) => {

    try {
        const result = await db.query(`SELECT name, tag FROM company;`);
        const response = {
            length: result.rows.length,
            companies: result.rows
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log("ERRO: " + error)
        return res.status(500).send(error);
    }
}

exports.findCompanyByTag = async (req, res, next) => {
    try {
        const result = await db.query("SELECT name, tag, funcdom, funcseg, functer, funcqua, funcqui, funcsex, funcsab, adrrua, adrnum, adrcom, adrbai, adrcid, adrest, txentrega FROM company WHERE tag = '" + [req.params.company] + "';");
        const queryRes = result.rows
        var response = { company: 'Erro ao consultar empresa' }
        if (queryRes.length === 0) {
            response = { company: 'Empresa ' + [req.params.company] + ' não encontrada' }
        } else {
            response = { company: result.rows }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}


