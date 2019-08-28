/**
 * Nufusu 500.000 ile 1milyon arasinda olan sehirleri gosterin.
 * Burada her seyi dinaik olarak yapmam tamamen ekstra is oldu.
 * Sadece sehirler dehil ulkeler icin de ayni sorguyu yapabileyim istedim.
 * Minimum ve maksimum araligi da degistirilebilir yapmak istedim.
 *
 * Ornegin localhost:3000/cities/?min=3000000&max=500000
 * Yukaridaki adres nufusu 300000 ile 500000 arasindaki sehirleri getirsin seklinde ayarlayabilirim
 * numberToText ve printTitle fonksiyonlari ise yardimci ve tamamen ekstra fonksiyonlar
 */

const { printTitle, numberToText } = require('../helpers');
const { myQuery } = require('../sql/db');

module.exports.between = async (table, min, max) => {
  const list = await myQuery(
    `SELECT name AS Name, population AS Population  FROM ${table} WHERE population BETWEEN ${min} AND ${max}`
  );

  printTitle(
    `${table} with population between ${numberToText(min)} AND ${numberToText(
      max
    )}:`
  );

  console.table(list);
};
