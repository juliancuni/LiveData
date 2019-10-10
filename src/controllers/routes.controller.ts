import express from 'express';

export function Routes(app: express.Express) {
    app.set('view engine', 'ejs');

    app.get('/', (req: express.Request, res: express.Response) => {
        // res.send('LIVE_DATA');
        const pilot = {
            x: 41.3275445,
            y: 19.8186983
        }
        res.render('../views/index.ejs', {pilot: pilot});
    })
}