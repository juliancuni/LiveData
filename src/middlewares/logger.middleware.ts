import express from 'express';

const LoggerMiddleWare = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        let remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let dateTime = new Date().toLocaleString("sq-AL", {timeZone: "Europe/Tirane"})

        // console.log(dateTime)
        // if(!req.originalUrl.includes("public")) console.info(`IP: ${req.ip} Method: ${req.method} Url: ${req.originalUrl} StatusCode: ${res.statusCode} Time: ${elapsed}ms`)
        if(!req.originalUrl.includes("public")) console.info(`IP: ${remoteIp} Method: ${req.method} Url: ${req.originalUrl} StatusCode: ${res.statusCode} Time: ${elapsed}ms`)
    })
    next();
}

export { LoggerMiddleWare };