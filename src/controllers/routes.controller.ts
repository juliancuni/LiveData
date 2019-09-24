import express from 'express';

export function Routes(app: express.Express) {
    app.get('/', (req: express.Request, res: express.Response) => {
        res.send('LIVE_DATA')
    })
}