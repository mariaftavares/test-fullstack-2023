const bcrypt = require('bcrypt')

const encryptPassword = (password) =>{
    const hashedpassaword = bcrypt.hashSync(password, 10)
    return hashedpassaword
}

const decryptPassword = (password,hashedpassaword) =>{
    const validpassaword = bcrypt.compareSync(password,hashedpassaword)
    return validpassaword
}

module.exports={
    encryptPassword,
    decryptPassword
}