const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')
const db = require('../db/index');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await db.getUserByEmail(email);

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        if (!user.password === password) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
