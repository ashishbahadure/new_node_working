var mysql=require('mysql');

var conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database:"node_dev"
});
var util=require("util");

var execute=util.promisify(conn.query).bind(conn);

module.exports=execute;


