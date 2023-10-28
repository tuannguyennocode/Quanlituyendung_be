import { AuditableMiddleware } from './auditable.middleware';

describe('AuditableMiddleware', () => {
  it('should be defined', () => {
    expect(new AuditableMiddleware()).toBeDefined();
  });
});
