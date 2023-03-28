const JWT_SECRET = process.env.JWT_SECRET

const db = require("../database/config")
const jwt = require('jsonwebtoken')
const { decryptPassword } = require('../utils/cryptography')
const { validateField, validateEmail } = require('../utils/validators')

const login = async (request, response) => {
    const { email, password } = request.body
    try {
        const fieldsNotValid = validateField(["email", "password"], [email, password])
        if (fieldsNotValid.length > 0) {
            throw {
                statusCode: 400,
                error: true,
                requiredFields: fieldsNotValid,
                errorMessage: "All mandatory fields must be informed"
            }
        }
        
        if (!validateEmail(email)) {
            throw {
                statusCode: 401,
                error: true,
                errorMessage: "Incorrect email or password"
            }
        }

        const userExist = await db.select('*').from('users').where('email', email).first()

        if (!userExist) {
            throw {
                statusCode: 401,
                error: true,
                errorMessage: "Incorrect email or password"
            }
        }
        
        const validPassword = decryptPassword(password, userExist.password)

        if (!validPassword) {
            throw {
                statusCode: 401,
                error: true,
                errorMessage: "Incorrect email or password"
            }
        }

        const token = generateToken(userExist)
        response.status(200).send({
            access: true,
            token: token,
            role: userExist.role
        })

    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).send(error.message)
        }
    }
}


const  verifyToken = (request, response) =>{
    try {
        const isAdmin =  request.user.role === 'admin'
        response.status(200).send({
            authenticated : true,
            isAdmin: isAdmin
        })

    } catch (error) {
        response.status(500).send(error.message)
    }

}


const generateToken = (user) => {
    const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, JWT_SECRET);
}


module.exports = {
    login,
    verifyToken
}