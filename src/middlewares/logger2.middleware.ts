import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Logger ...");
    console.log(req.ip);
    console.log(req.path);

    next();
}
