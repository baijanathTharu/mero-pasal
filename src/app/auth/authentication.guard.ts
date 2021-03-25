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
    // console.log(req.session);
    try {
      if (req.session.passport.user) {
        return true;
      }
      throw new UnauthorizedException(`Unauthorized`);
    } catch (e) {
      throw new Error(e);
    }
  }
}
