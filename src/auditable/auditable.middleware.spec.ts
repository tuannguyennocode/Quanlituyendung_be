import { Test, TestingModule } from '@nestjs/testing';
import { AuditableMiddleware } from './auditable.middleware';
import { AuthService } from 'src/auth/auth.service';

describe('AuditableMiddleware', () => {
    let middleware: AuditableMiddleware;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuditableMiddleware, AuthService],
        }).compile();

        middleware = module.get<AuditableMiddleware>(AuditableMiddleware);
    });

    it('should be defined', () => {
        expect(middleware).toBeDefined();
    });
});
