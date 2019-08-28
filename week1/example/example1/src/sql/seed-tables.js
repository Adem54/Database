/**
 * Bu modulde olusturulan tablolara json verilerini ekliyoruz.
 * INSERT_TABLE sorgusu prepared statements ile yapilmistir. (? isareti kullanarak)
 *
 */

const { connection, myQuery } = require('./db');
const getData = require('../data/getData');
const { INSERT_TABLE } = require('./queries');

module.exports.seedTables = async () => {
  try {
    connection.connect();

    const cities = await getData('cities');
    const cityValues = cities.map(c => Object.values(c));
    const cityColumns = Object.keys(cities[0]).join(', ');

    const countries = await getData('countries');
    const countryValues = countries.map(c => Object.values(c));
    const countryColumns = Object.keys(countries[0]).join(', ');

    // Birden fazla ulkeyi ayni anda eklemek icin.
    // Bu kismi manuel olarak test edin. countryValues ic ice array.
    await myQuery(INSERT_TABLE('countries', countryColumns), countryValues);
    console.log(`'${countries.length}' country inserted to table succesfully.`);

    // Birden fazla sehri ayni anda eklemek icin.
    await myQuery(INSERT_TABLE('cities', cityColumns), cityValues);
    console.log(`'${cities.length}' city inserted to table succesfully.`);

    connection.end();
  } catch (error) {
    console.log(error);
    return connection.end();
  }
};
