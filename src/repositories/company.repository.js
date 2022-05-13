
const { db } = require('../db');
const { checkProps } = require('../utils/checkProps');
const { verifyJWT } = require('../utils/checkToken');

exports.findAllCompany = async (req, res, next) => {

    try {
        const result = await db.query(`SELECT name, tag, logo FROM company;`);
        const response = {
            length: result.rows.length,
            companies: result.rows
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log("ERRO: " + error)
        return res.status(500).send(error);
    }
}

exports.findCompanyByTag = async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM company WHERE tag = '" + [req.params.company] + "';");
        const queryRes = result.rows
        var response = { company: ['Erro ao consultar empresa'] }
        if (queryRes.length === 0) {
            response = { company: ['Empresa ' + [req.params.company] + ' não encontrada'] }
        } else {
            response = { company: result.rows }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.insertCompany = (req, res, next) => {
    try {

        const data = req.body
        const token = req.headers.authorization
        const vToken = verifyJWT(token)
        console.log(verifyJWT(token))
        if (vToken.status === 401) {

            return res.status(401).send(vToken.message)

        } else if (vToken.status === 500) {

            return res.status(500).send(vToken.message)

        } else if (vToken.status === 200) {

            if (checkProps(data) === true) {
                return res.status(200).send(`Empresa ${data.name} cadastrada`);
            } else {
                return res.status(404).send('Requisição invalida');
            }

        }

    } catch (error) {
        const data = req
        return res.status(500).send({ data });
    }

}