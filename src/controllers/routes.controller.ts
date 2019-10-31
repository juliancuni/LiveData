import express from 'express';
import { ExecQuery } from '../helpers/mssql';

export function Routes(app: express.Express) {

    app.set('view engine', 'ejs');
    // app.set("view engine", "hbs");

    app.get('/', (req: express.Request, res: express.Response) => {
        let clientData, listaEPiloteve;
        // ExecQuery("SELECT * FROM tavl.Client WHERE ClientId = 16").then((data) => {
        //     return ExecQuery("SELECT * FROM ")
        //     clientData = data;
        // });
        const dataSot = new Date();
        const dataThjeshte = dataSot.getFullYear().toString() + '-' + (dataSot.getMonth() + 1).toString() + '-' + dataSot.getDate().toString();
        let dataSotStart = dataThjeshte + " 00:00:00";
        // let dataSotStart = "2018-06-10 00:00:00";
        let dataSotEnd = dataThjeshte + " 23:59:59";
        // let dataSotEnd = "2018-06-10 23:59:59";
        let testQry = "SELECT tavl.Object.Number as Pilot,m.X as CordX,m.Y as CordY  FROM tavl.Message as m  JOIN ( SELECT tavl.Message.ObjectId, MAX(MessageId) as MessageId FROM tavl.Message inner join tavl.Object as o on tavl.Message.ObjectId=o.ObjectId where o.ClientId=16 and o.Number!='null' and GpsTime >= '" + dataSotStart + "' and GpsTime <= '" + dataSotEnd + "' GROUP BY tavl.Message.ObjectId ) t2 ON m.ObjectId = t2.ObjectId AND m.MessageId = t2.MessageId join tavl.Object on tavl.Object.ObjectId=m.ObjectId";
        ExecQuery(testQry).then((data) => {
            // console.log(data);
            res.render('../views/index.ejs', { pilots: data });
            // res.render("../views/test", { pilot: data });
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    })
}