const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'1704b',
    port:'3306'
})

connection.connect((error)=>{
    if(error){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
    }
})

module.exports = connection;