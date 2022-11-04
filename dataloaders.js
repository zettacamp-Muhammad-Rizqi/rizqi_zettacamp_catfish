//import dataloader
const DataLoader = require('dataloader')


async function batchOwners(ownerIds){

}

const ownerLoader = () => {
    return new DataLoader(ownerIds => batchOwners(ownerIds))
}