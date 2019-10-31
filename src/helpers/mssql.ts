import * as mssql from 'mssql';
import path from 'path';

const config = require(path.resolve("./src/mssql.config.json"));
let tavl2: mssql.ConnectionPool | undefined;

const MsSqlConnect = () => {
	return new Promise((resolve, reject) => {
		tavl2 = new mssql.ConnectionPool(config.db, err => {
			if (err) {
				console.error("Lidhja me databazen deshtoi.", err);
				reject(err);
			} else {
				console.log("Databaza u lidh.");
				resolve();
			}
		});
	});
};

const ExecQuery = async (qry: string) => {
	const request = new mssql.Request(tavl2);
	const result = await request.query(qry);
	return result.recordset;
}

export { MsSqlConnect, ExecQuery };