const mongoose = require('mongoose')

const PersonaSchema = new mongoose.Schema({
    game: {
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
    }
})

PersonaSchema.method.getPersonaByHandle = handle => {
    Persona.find( { 'handle': handle } ).then(persona => {
        return persona
    })
}

const Persona = mongoose.model('Persona', PersonaSchema)
module.exports = Persona