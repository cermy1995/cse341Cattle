const Joi = require('@hapi/joi')


//schema for post endpoint
const postSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    sex: Joi.string().valid('male', 'female').required(),
    birthDate: Joi.date().required(),
    birthWeight: Joi.number().required(),
    sireBreed: Joi.string().lowercase().required(),
    damBreed: Joi.string().lowercase().required(),
    currentWeight: Joi.number().required()
})

//schema for put endpoint
const putSchema = Joi.object({
    name: Joi.string().lowercase(),
    sex: Joi.string().valid('male', 'female'),
    birthDate: Joi.date(),
    birthWeight: Joi.number(),
    sireBreed: Joi.string().lowercase(),
    damBreed: Joi.string().lowercase(),
    currentWeight: Joi.number().required()
})

module.exports = {
    postSchema,
    putSchema
}