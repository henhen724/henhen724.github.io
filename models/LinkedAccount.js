const mongoose = require('mongoose')

const LinkedAccountSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    personas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona'
        }
    ]
})

LinkedAccountSchema.method.addPersona = persona => {
    this.personas.push(persona)
    return this.save()
}
LinkedAccountSchema.method.getAccountById = (platform, id) =>{
    LinkedAccount.find({'platform': platform, 'id': id}).then(account => {
        return account;
    })
}

const LinkedAccount = mongoose.model('LinkedAccount', LinkedAccountSchema)
module.exports = LinkedAccount