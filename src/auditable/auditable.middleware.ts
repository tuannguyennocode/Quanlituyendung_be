import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuditableMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}
    async use(req: any, res: any, next: () => void) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.slice(7);
            if (token) {
                const userEmail = await this.authService.getUserEmailFromToken(token);
                const auditableFields = {
                    createdBy: userEmail,
                    updatedBy: userEmail,
                    updatedAt: new Date(),
                };
                req.body = { ...auditableFields, ...req.body };
                next();
            }
        }
    }
}
