const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
    'host': 'ec2-23-23-182-238.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'dgicci5rheirj',
    'user': 'zqmisbyymllsqn',
    'password': '8e572ea1c3ec2980da32443ae164261556f0c7ded2d56cf339f00b61d03c3499'
};

// const databaseConfig = {
//     'host': '127.0.0.1',
//     'port': 5432,
//     'database': 'delivery_aki_voy',
//     'user': 'postgres',
//     'password': '3dxuy3lvxl398@TA'
// };





const db = pgp(databaseConfig);

module.exports = db;