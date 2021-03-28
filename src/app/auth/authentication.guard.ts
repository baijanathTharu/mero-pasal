import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      if (req.session.passport.user) {
        return true;
      }
      throw new Error(`Unauthorized`);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
