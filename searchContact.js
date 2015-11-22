module.exports = search

function search(key, data){
    //Data is an array of objects(all the contacts that match the key)
    var result = data.filter(function(contact){
        for(var prop in contact){
                if(typeof contact[prop] !== 'object' && typeof contact[prop] !== 'number'){
                var toLower = contact[prop].toLowerCase();
                if(toLower.match(key.toLowerCase())){
                    return true;
                }
            }
        }
    })
    return result;
}