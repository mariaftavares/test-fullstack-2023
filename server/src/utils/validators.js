const validateField = (fieldsNames, fields) => {
    const fieldsNotValid = []
    fields.forEach((field, index) => {
        if (typeof field === 'string') {
            if (!field || field.trim() == "") {
                fieldsNotValid.push(fieldsNames[index])
            }
        }
        else {
            if (!field || field.length === 0 || field == 0) {
                fieldsNotValid.push(fieldsNames[index])
            }
        }
    });
    return fieldsNotValid
}

const validateEmail = (email) => {
    const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    return regex.test(email);
}

module.exports = {
    validateField,
    validateEmail
}