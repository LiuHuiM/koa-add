const connect = require('./index.js');

const query = (sql,params = [])=>{
    return new Promise((resolve,reject)=>{
        connect.query(sql,params,(error,data)=>{
            if(error){
                reject({msg:'error',error})
            }else{
                console.log(data)
                resolve({msg:'success',data});
            }
        })
    })
}

module.exports = query; 
