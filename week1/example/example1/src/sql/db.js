/**
 * BU MODULDE connection ve query olusturuluyor.
 * Promisify yerine manuel olarak Promise yapilmistir.
 * Query fonksiyonunu farkli dosyalarda da kullanmak icin export ediyoruz
 */

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

function myQuery(sql, array = null) {
  return new Promise((resolve, reject) => {
    // For multiple insert
    if (array) {
      connection.query(sql, [array], (error, results) => {
        if (error) {
          reject(error);
        }

        return resolve(results);
      });
    }

    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}

module.exports = { connection, myQuery };
