import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Request } from "express";
import { jwtConstants } from "../constants";

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategies extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // (request: Request) => {
        //   let data = request?.cookies["access_cookies"];
        //   if (!data) {
        //     return null;
        //   }

        //   return data;
        // },
      ]),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
