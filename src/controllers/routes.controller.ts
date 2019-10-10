import express from 'express';

export function Routes(app: express.Express) {
    app.set('view engine', 'ejs');

    app.get('/', (req: express.Request, res: express.Response) => {
        const self = {
            x: 41.3929327,
            y: 19.8922982
        }
        res.render('../views/index.ejs', { pilot: self });
    })
}