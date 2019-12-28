import express from 'express';
import * as path from 'path';
import { ExecQuery } from '../helpers/mssql';

export function Routes(app: express.Express) {

    // app.set('view engine', 'ejs');
    app.set("view engine", "html");

    app.get('/test', (req: express.Request, res: express.Response) => {
        const qry = "SELECT tavl.Object.Comment, tavl.Object.Number FROM Object"
        res.send("test")
    })

    app.get('/', (req: express.Request, res: express.Response) => {
        let listaAsistenca: any[] = [
            { emer: "Safety Car", kombesia: "AL", kategoria: "C1", nrGaruesit: "007", neGare: false, Lat: 41.3451283, Lng: 19.771245 },
            { emer: "Idi ", kombesia: "AL", kategoria: "C1", nrGaruesit: "120", neGare: false, Lat: 41.354409, Lng: 19.7721059 }
        ];
        let listaGaruesve: any[] = [
            { emer: "Dorian Nurka", kombesia: "AL", kategoria: "C1", nrGaruesit: 301, neGare: true, Lat: 41.3037934, Lng: 19.8095346 },
            { emer: "Almir Dervishaj", kombesia: "AL", kategoria: "C1", nrGaruesit: 385, neGare: true, Lat: 41.3506832, Lng: 19.7475187 },
            { emer: "Ermal Pashaj", kombesia: "AL", kategoria: "M1", nrGaruesit: 908, neGare: true, Lat: 41.352081, Lng: 19.745073 }
            
        ];
        res.render("../views/index.ejs", { garuesit: listaGaruesve, asistenca: listaAsistenca });
    });

    // app.get('/', (req: express.Request, res: express.Response) => {

    //     const dataSot = new Date();
    //     const dataThjeshte = dataSot.getFullYear().toString() + '-' + (dataSot.getMonth() + 1).toString() + '-' + dataSot.getDate().toString();
    //     let dataSotStart = dataThjeshte + " 00:00:00";
    //     // let dataSotStart = "2018-06-10 00:00:00";
    //     let dataSotEnd = dataThjeshte + " 23:59:59";
    //     // let dataSotEnd = "2018-06-10 23:59:59";
    //     let dataQry = "SELECT tavl.Object.Comment as bruto, tavl.Object.Number as nrGaruesit, m.X as Lng,m.Y as Lat  FROM tavl.Message as m  JOIN ( SELECT tavl.Message.ObjectId, MAX(MessageId) as MessageId FROM tavl.Message inner join tavl.Object as o on tavl.Message.ObjectId=o.ObjectId where o.ClientId=16 and o.Number!='null' and GpsTime >= '" + dataSotStart + "' and GpsTime <= '" + dataSotEnd + "' GROUP BY tavl.Message.ObjectId ) t2 ON m.ObjectId = t2.ObjectId AND m.MessageId = t2.MessageId join tavl.Object on tavl.Object.ObjectId=m.ObjectId";
    //     ExecQuery(dataQry).then((data) => {
    //         let listaAsistenca: any[] = [];
    //         let listaGaruesve: any[] = [];
    //         data.forEach((dt) => {
    //             // console.log(dt.nrGaruesit)
    //             let dataSplit = dt.bruto.split('|')
    //             dt.emer = dataSplit[0];
    //             dt.kombesia = dataSplit[2].toUpperCase();
    //             dt.kategoria = dataSplit[3];
    //             if (dataSplit[1].toLowerCase().includes('gps')) {
    //                 dt.neGare = true;
    //             } else {
    //                 dt.neGare = false;
    //             }
    //         })

    //         listaAsistenca = data.filter((dt) => {
    //             return !dt.neGare;
    //         })

    //         listaGaruesve = data.filter((dt) => {
    //             return dt.neGare;
    //         })

    //         res.render("../views/index.ejs", { garuesit: listaGaruesve, asistenca: listaAsistenca });
    //     }).catch((err) => {
    //         console.log(err);
    //         res.sendStatus(500);
    //     })
    // });

    app.get('/leaflet', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname + '/leaflet.html'));
    })

    app.get('/gmaps', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname + '/gmaps.html'));
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