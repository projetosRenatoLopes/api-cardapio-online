const checkProps = (objeto) => {
    if (objeto.hasOwnProperty("name") &&
        objeto.hasOwnProperty("tag") &&
        objeto.hasOwnProperty("funcdom") &&
        objeto.hasOwnProperty("funcseg") &&
        objeto.hasOwnProperty("functer") &&
        objeto.hasOwnProperty("funcqua") &&
        objeto.hasOwnProperty("funcqui") &&
        objeto.hasOwnProperty("funcsex") &&
        objeto.hasOwnProperty("funcsab") &&
        objeto.hasOwnProperty("adrrua") &&
        objeto.hasOwnProperty("adrnum") &&
        objeto.hasOwnProperty("adrcom") &&
        objeto.hasOwnProperty("adrbai") &&
        objeto.hasOwnProperty("adrcid") &&
        objeto.hasOwnProperty("adrest") &&
        objeto.hasOwnProperty("txentrega") &&
        objeto.hasOwnProperty("logo") &&
        objeto.hasOwnProperty("tel") === true) {
        return true
    } else {
        return false
    }
}

exports.checkProps = checkProps;