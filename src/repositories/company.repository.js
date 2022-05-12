
const { db } = require('../db');
const {checkProps} = require('../utils/checkProps');

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
    const data = req.body
    if (checkProps(data) === true) {
        return res.status(200).send( `Empresa ${data.name} cadastrada` );
    } else {
        return res.status(404).send('Requisição invalida');
    }
    //return res.status(200).send(data);


    // try {
    // } catch (error) {
    //     const data = req
    //     return res.status(500).send({data});
    // }

}