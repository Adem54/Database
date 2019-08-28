const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

// Connection objesinin query fonksiyonunu promisify ile otomatik promise ceviriyoruz
// Connection objesini bind ile gonderiyoruz. Burada bind ile hangi connection nesnesi icin query fonksiyonunu
// kullanmak istedigimizi belirtiyoruz. Bind a verilen 'this' nesnesi connection olmus oluyor.
// Boylelikle execQuery promise donen bir fonksiyon olmus oluyor.
// Fakat eger fonksiyonu `SELECT` gibi geriye veri donduren bir amacla kullanmiyorsak then kullanmak zorunda degiliz.
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  // Standart students ve teachers tablolari icin sql sorgu kodlari
  const CREATE_STUDENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS students (
      student_number INT,
      student_name VARCHAR(50),
      date_of_birth DATE,
      grade FLOAT,
      gender ENUM('m', 'f')
    );`;

  const CREATE_TEACHERS_TABLE = `
    CREATE TABLE IF NOT EXISTS teachers (
      teacher_number INT,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender ENUM('m', 'f')
    );`;

  // Tabloya eklenecek students dizisi
  const students = [
    {
      student_number: 4444,
      student_name: 'Benno',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm'
    },
    {
      student_number: 3333,
      student_name: 'Henriata',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'm'
    }
  ];

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_STUDENTS_TABLE);
    await execQuery(CREATE_TEACHERS_TABLE);
    students.forEach(async student => {
      // Burada PREPARED STATEMENTS kullanilmis.
      await execQuery('INSERT INTO students SET ?', Object.values(student));
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();

/**
 * PREPARED STATEMENTS NEDIR?
 * SQL Injection sorunlarina engel olmak icin yapilir.
 * SQL injection ise disaridan birisinin veritabanina url ile direkt mudahele etmesi
 * gibi bir guvenlik acigidir. Daha genis bilgi icin http://cgnyazilim.com/blog/sql-injection-nedir/
 */
const example = async () => {
  // Prepared Statements ile ornek sorgular
  const insertQuery = `INSERT INTO cities (name, country_code, district, population) VALUES ?`;
  const selectQuery = `SELECT name FROM cities WHERE name = ?`;
  const updateQuery = `UPDATE cities SET name = ?, country_code = ?, district = ?, population = ?`;

  // Yukaridaki sorgulari fonksiyonla su sekilde calistirabiliriz.
  // Queriden sonraki degerler array icinde olmali
  // Soru isareti yerine sirasiyla arraydeki degerler konmus olur.
  myQuery(insertQuery, [name, country_code, district, population]);
  myQuery(selectQuery, [name]);
  myQuery(updateQuery, [name, country_code, district, population]);
};
