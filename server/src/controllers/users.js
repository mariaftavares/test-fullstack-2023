const db = require("../database/config");
const { encryptPassword } = require('../utils/cryptography');
const { validateField, validateEmail } = require('../utils/validators');

const getAllUsers = async (request, response) => {
    try {
        const allUsers = await db.select("*").table("users")
        response.status(200).json(allUsers)
    } catch (error) {
        response.status(500).send(error.message)
    }
}

const getUserById = async (request, response) => {
    const { id } = request.params
    try {
        const user = await db.select("*").table("users").where('id', id).first()
        response.status(200).json(user)
    } catch (error) {
        response.status(500).send(error.message)
    }
}

const createUser = async (request, response) => {
    const { name, email, password, role } = request.body
    try {
        const fieldsNotValid = validateField(["name", "email", "password", "role"], [name, email, password, role]);
        if (fieldsNotValid.length > 0) {
            throw {
                statusCode: 400,
                error: true,
                requiredFields: fieldsNotValid,
                errorMessage: `All mandatory fields must be informed: ${fieldsNotValid}`
            }
        }

        if (!validateEmail(email)) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "The email entered is not valid."
            }
        }

        const emailExist = await db.select('id').from('users').where('email', email).first()

        if (emailExist) {
            throw {
                statusCode: 409,
                errorMessage: "This email is already in use"
            }
        }

        const hashedpassaword = encryptPassword(password);

        const newUser = await db.insert({
            name: name,
            email: email,
            password: hashedpassaword,
            role: role
        })
            .table('users')
            .then(row => { return row[0] })  
         
         const getNewUser = await db.select("*").table('users').where('id',newUser).first()

        response.status(200).json({
            success: true,
            newUser:getNewUser
        })

    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).send(error.message)
        }
    }
}

const updateUser = async (request, response) => {
    const { id } = request.params
    const data = request.body
    try {
        if (data.email) {
            if (!validateEmail(data.email)) {
                throw {
                    statusCode: 400,
                    error: true,
                    errorMessage: "The email entered is not valid."
                }
            }

            const emailExist = await db.select('id').from('users').where('email', data.email).first()

            if (emailExist) {
                throw {
                    statusCode: 409,
                    error: true,
                    errorMessage: "This email is already in use"
                }
            }
        }

        if (data.password) {
            data.password = bcrypt.hashSync(data.password, 10);
        }

        const userUpdated = await db.update(data).where('id', id).table('users').then(row => { return row });

        if (!userUpdated) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "The id sent is not valid"
            }
        }
        const getUserUpdated = await db.select("*").table('users').where('id',id).first()

        response.status(200).json({
            success: true,
            userUpdated:getUserUpdated
        })

    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).send(error.message)
        }
    }
}

const removeUser = async (request, response) => {
    const { id } = request.params
    try {
        const userRemove = await db.where('id', id).del().table('users');

        if (!userRemove) {
            throw {
                statusCode: 400,
                error: true,
                errorMessage: "The id sent is not valid"
            }
        }
        
        response.status(200).json({
            success: true
        })

    } catch (error) {
        if (error.statusCode) {
            response.status(error.statusCode).json(error)
        } else {
            response.status(500).send(error.message)
        }
    }
}



module.exports = {
    createUser,
    updateUser,
    removeUser,
    getAllUsers,
    getUserById
}