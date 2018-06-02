import {
  Request,
  Response,
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
} from '@nestjs/common';

import {ExtractJwt} from 'passport-jwt';

@Injectable()
export class CORSMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req: Request, res, next) => {

      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      );
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.header('X-Powered-By', '3.2.1');
      res.header('Content-Type', 'application/json;charset=utf-8');

      // console.log(req.method);

      if (req.method === 'OPTIONS') {
        res.send();
      }else{
        next();
      }
    };
  }
}
