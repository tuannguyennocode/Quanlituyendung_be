import { Injectable, NestMiddleware } from '@nestjs/common';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { CommonSchemaProps } from 'src/common/commonSchemaProps';

@Injectable()
export class AuditableMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}
    use(req: any, res: any, next: () => void) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.slice(7); 
            if (token) {
                const auditableFields = {
                    createdBy: this.authService.getUserEmailFromToken(token),
                    updatedBy: this.authService.getUserEmailFromToken(token),
                    updatedAt: new Date(),
                };
                req.body = { ...req.body, ...auditableFields };
                next();
            }
        }
    }
}
