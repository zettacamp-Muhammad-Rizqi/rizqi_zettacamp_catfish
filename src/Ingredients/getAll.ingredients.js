const { ApolloError } = require('apollo-server-express')
const { default: mongoose } = require('mongoose')
const {ingredients} = require('../model/Ingredients')

const getAllIngredient = async (_, {name, stock, skip, limit}) =>{
    
    const matchQuery = {$and : [{status:"active"}]}

    if(name){
        matchQuery.$and.push({name})
    }
    if(stock){
        matchQuery.$and.push({stock})
    }else if(stock<=0){
        throw new ApolloError('Stock: []')
    }

    if(!name && !stock && !skip && !limit){
        const getAll = await ingredients.find({})
        return getAll
    }

    const getAll= await ingredients.aggregate([
        {
            $match: matchQuery
        },
        {
            $skip: skip*limit
        },
        {
            $limit: limit
        }
    ])

    return getAll

}
module.exports={getAllIngredient}