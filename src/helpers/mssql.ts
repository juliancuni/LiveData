import * as mssql from 'mssql';
import path from 'path';

const config = require(path.resolve("./src/mssql.config.json"));
let db1;
const connect = () => {
    console.log(mssql.ConnectionPool.length)
	return new Promise((resolve, reject) => {
		db1 = new mssql.ConnectionPool(config.db, err => {
			if (err) {
				console.error("Lidhja me databazen deshtoi.", err);
				reject(err);
			} else {
				// console.log("Databaza u lidh.");
				resolve();
			}
		});
	});
};

export { connect };