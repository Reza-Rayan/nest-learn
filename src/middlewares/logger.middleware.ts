import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log('Logger ...');
        console.log(req.ip);
        console.log(req.path);
        
        next();
    }

}
