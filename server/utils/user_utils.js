const config = require('../config/config');
const sql_config = config.sql_config;
const mysql =  require('mysql');
const pool = mysql.createPool({
  host     :  sql_config.HOST,
  user     :  sql_config.USERNAME,
  password :  sql_config.PASSWORD,
  database :  sql_config.DATABASE
});
//使用promise封装的用于查询的方法
let query = function (sql,values) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
};
/*获取一张表中的所有数据*/
let findTableData = function (table) {
  let _sql = 'SELECT * FROM ??';
  return query(_sql,table)
};
/*根据表中的name查找数据*/
let findDataByUser = function (table,username) {
  let _sql = 'SELECT * FROM ?? WHERE name = ?';
  return query(_sql,[table,username])
};
/*往指定的表中插入数据*/
let insertData = function( table, values ) {
  let _sql = "INSERT INTO ?? SET ?"
  return query( _sql, [ table, values ] )
}
/*更新表中的某个字段*/
let updateData = function (table,data,name) {
  let _sql = "UPDATE ?? SET login_time = ? WHERE name = ?"
  return query(_sql,[table,data,name])
}
module.exports = {
  query,
  findTableData,
  findDataByUser,
  insertData,
  updateData
};
