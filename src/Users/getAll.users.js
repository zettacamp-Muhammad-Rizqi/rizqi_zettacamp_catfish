const {users} = require('../model/Users')

const getAllUser = async (_, {email, last_name, first_name, skip, limit}) =>{
    
    const matchQuery = {$and : [{status:"active"}]}

    if(email){
        matchQuery.$and.push({email})
    }
    if(last_name){
        matchQuery.$and.push({last_name})
    }
    if(first_name){
        matchQuery.$and.push({first_name})
    }
    if(!skip && !limit && !email && !last_name && !first_name){
        const getAll = await users.find({})
        return getAll
    }

    const getAll= await users.aggregate([
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

module.exports = {getAllUser}