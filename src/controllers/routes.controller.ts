import express from 'express';
import * as path from 'path';
import { ExecQuery } from '../helpers/mssql';

export function Routes(app: express.Express) {

    // app.set('view engine', 'ejs');
    app.set("view engine", "html");

    app.get('/', (req: express.Request, res: express.Response) => {
        let clientData, listaEMjeteve;
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
        let dataQry = "SELECT tavl.Object.Comment as Mjet, tavl.Object.Number as nrGaruesit, m.X as Lng,m.Y as Lat  FROM tavl.Message as m  JOIN ( SELECT tavl.Message.ObjectId, MAX(MessageId) as MessageId FROM tavl.Message inner join tavl.Object as o on tavl.Message.ObjectId=o.ObjectId where o.ClientId=16 and o.Number!='null' and GpsTime >= '" + dataSotStart + "' and GpsTime <= '" + dataSotEnd + "' GROUP BY tavl.Message.ObjectId ) t2 ON m.ObjectId = t2.ObjectId AND m.MessageId = t2.MessageId join tavl.Object on tavl.Object.ObjectId=m.ObjectId";
        ExecQuery(dataQry).then((data) => {
            // let mjetetSort = data.sort(function (a, b) {
            //     var mjetiA = a.Mjet.toUpperCase(); 
            //     var mjetiB = b.Mjet.toUpperCase(); 
            //     if (mjetiA < mjetiB) {
            //         return -1;
            //     }
            //     if (mjetiA > mjetiB) {
            //         return 1;
            //     }
            //     return 0;
            // })
            // res.render('../views/index.ejs', { mjetet: mjetetSort });
            let listaAsistenca: any[] = [];
            let listaGaruesve: any[] = [];
            data.forEach((dt) => {
                // console.log(dt.nrGaruesit)
                let dataSplit = dt.Mjet.split('|')
                dt.emer = dataSplit[0];
                dt.kombesia = dataSplit[2].toUpperCase();
                dt.kategoria = dataSplit[3];
                if (dataSplit[1].toLowerCase().includes('gps')) {
                    dt.neGare = true;
                } else {
                    dt.neGare = false;
                }
            })

            listaAsistenca = data.filter((dt) => {
                return !dt.neGare;
            })

            listaGaruesve = data.filter((dt) => {
                return dt.neGare;
            })

            res.render("../views/index.ejs", { garuesit: listaGaruesve, asistenca: listaAsistenca });
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    });

    app.get('/html', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    })

    app.get('/api/mjetetgps', (req: express.Request, res: express.Response) => {

        let clientData, listaEMjeteve;
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
        let dataQry = "SELECT tavl.Object.Number as Mjet,m.X as Lng,m.Y as Lat FROM tavl.Message as m JOIN ( SELECT tavl.Message.ObjectId, MAX(MessageId) as MessageId FROM tavl.Message inner join tavl.Object as o on tavl.Message.ObjectId=o.ObjectId where o.ClientId=16 and o.Number!='null' and GpsTime >= '" + dataSotStart + "' and GpsTime <= '" + dataSotEnd + "' GROUP BY tavl.Message.ObjectId ) t2 ON m.ObjectId = t2.ObjectId AND m.MessageId = t2.MessageId join tavl.Object on tavl.Object.ObjectId=m.ObjectId";
        ExecQuery(dataQry).then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

    });
}