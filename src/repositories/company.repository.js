
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
        return res.status(500).send({ 'Error': 500, 'message': error.error });
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
        return res.status(500).send({ 'Error': 500, 'message': error.error });
    }
}

exports.insertCompany = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {

            if (checkProps(req.body) === true) {

                //const result = db.query("INSERT INTO company (name, tag, funcdom, funcseg, functer, funcqua, funcqui, funcsex, funcsab, adrrua, adrnum, adrcom, adrbai, adrcid, adrest, txentrega, logo, tel, categs, paymodes) '" + JSON.stringify(req.body.empname) + "','" + [req.body.emptag] + "','" + [req.body.empfuncdom] + "','" + [req.body.empfuncseg] + "','" + [req.body.empfuncter] + "','" + [req.body.empfuncqua] + "','" + [req.body.empfuncqui] + "','" + [req.body.empfuncsex] + "','" + [req.body.empfuncsab] + "','" + [req.body.empadrrua] + "','" + [req.body.empadrnum] + "','" + [req.body.empadrcom] + "','" + [req.body.empadrbai] + "','" + [req.body.empadrcid] + "','" + [req.body.empadrest] + "','" + [req.body.emptxentrega] + "','" + [req.body.emplogo] + "','" + [req.body.emptel] + "','" + [req.body.empcategs] + "','" + [req.body.emppaymodes] + "';");
                const result = await db.query("INSERT INTO company (name, tag, funcdom, funcseg, functer, funcqua, funcqui, funcsex, funcsab, adrrua, adrnum, adrcom, adrbai, adrcid, adrest, txentrega, logo, tel, categs, paymodes) VALUES ('" + [req.body.empname] + "','" + [req.body.emptag] + "','" + [req.body.empfuncdom] + "','" + [req.body.empfuncseg] + "','" + [req.body.empfuncter] + "','" + [req.body.empfuncqua] + "','" + [req.body.empfuncqui] + "','" + [req.body.empfuncsex] + "','" + [req.body.empfuncsab] + "','" + [req.body.empadrrua] + "','" + [req.body.empadrnum] + "','" + [req.body.empadrcom] + "','" + [req.body.empadrbai] + "','" + [req.body.empadrcid] + "','" + [req.body.empadrest] + "','" + [req.body.emptxentrega] + "','" + [req.body.emplogo] + "','" + [req.body.emptel] + "','" + [req.body.empcategs] + "','" + [req.body.emppaymodes] + "','" + [req.body.backcolor] + "');");
                return res.status(200).send({ "status": 200, "message": "Dados inserido com sucesso" });
            } else {
                return res.status(404).send({ "status": 404, "message": "Requisição inválida" });
            }

        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }

}

exports.updateCompany = async (req, res, next) => {
    try {
        const vToken = verifyJWT(req.headers.authorization)
        if (vToken.status === 401) { return res.status(401).send({ "error": 401, "message": vToken.message }) }
        else if (vToken.status === 500) { return res.status(500).send({ "error": 500, "message": vToken.message }) }
        else if (vToken.status === 200) {
            const user = await db.query("SELECT tagpage, name from users WHERE uuid = '" + vToken.id + "';")
            if (user.rowCount === 0) {
                return res.status(401).send({ "status": 401, "message": "Usuário inválido." });
            } else {
                if (user.rows[0].tagpage === req.body.emptag) {

                    const result = await db.query("UPDATE company SET name = '" + [req.body.empname] + "', funcdom = '" + [req.body.empfuncdom] + "', funcseg = '" + [req.body.empfuncseg] + "', functer = '" + [req.body.empfuncter] + "', funcqua = '" + [req.body.empfuncqua] + "', funcqui = '" + [req.body.empfuncqui] + "', funcsex = '" + [req.body.empfuncsex] + "', funcsab = '" + [req.body.empfuncsab] + "', adrrua = '" + [req.body.empadrrua] + "', adrnum = '" + [req.body.empadrnum] + "', adrcom = '" + [req.body.empadrcom] + "', adrbai = '" + [req.body.empadrbai] + "', adrcid = '" + [req.body.empadrcid] + "', adrest = '" + [req.body.empadrest] + "', txentrega = '" + [req.body.emptxentrega] + "', logo = '" + [req.body.emplogo] + "', tel = '" + [req.body.emptel] + "', categs = '" + [req.body.empcategs] + "', paymodes = '" + [req.body.emppaymodes] + "', backcolor = '" + [req.body.backcolor] + "' WHERE  tag = '" + [req.body.emptag] + "';")
                    console.log(req.body.backcolor)
                    return res.status(200).send({ "status": 200, "message": "Dados atualizados com sucesso" });
                } else {
                    return res.status(401).send({ "status": 401, "message": "Usuário sem permissão no dietório" });
                }
            }

            //if (checkProps(req.body) === true) {

            //const result = db.query("UPDATE INTO company (name, tag, funcdom, funcseg, functer, funcqua, funcqui, funcsex, funcsab, adrrua, adrnum, adrcom, adrbai, adrcid, adrest, txentrega, logo, tel, categs, paymodes) '" + JSON.stringify(req.body.empname) + "','" + [req.body.emptag] + "','" + [req.body.empfuncdom] + "','" + [req.body.empfuncseg] + "','" + [req.body.empfuncter] + "','" + [req.body.empfuncqua] + "','" + [req.body.empfuncqui] + "','" + [req.body.empfuncsex] + "','" + [req.body.empfuncsab] + "','" + [req.body.empadrrua] + "','" + [req.body.empadrnum] + "','" + [req.body.empadrcom] + "','" + [req.body.empadrbai] + "','" + [req.body.empadrcid] + "','" + [req.body.empadrest] + "','" + [req.body.emptxentrega] + "','" + [req.body.emplogo] + "','" + [req.body.emptel] + "','" + [req.body.empcategs] + "','" + [req.body.emppaymodes] + "';");
            //return res.status(200).send({ "status": 200, "message": "Dados atualizados com sucesso" });

            //} else {
            //    return res.status(404).send({"status":404, "message":"Requisição inválida"});
        }

    } catch (error) {
        return res.status(500).send({ 'Error': error.code, 'message': error.error });
    }
}