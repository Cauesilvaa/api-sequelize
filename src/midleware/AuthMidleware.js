const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { promisify } = require('util');
const { config } = require('process');

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth){
        return res.json({
            code: 130,
            message: "Token de autenticação não existe"
        })
    }

    const [bearer, token] = auth.split(' ');

    // console.log(token)

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        if (!decoded){
            return res.json({
                code: 130,
                message: "Token expirado"
            })
        } else {
            req.id = decoded.id;
            next();
        }
    } catch (error) {
        console.log(error)
    }
}