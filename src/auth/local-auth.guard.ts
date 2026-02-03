import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const strategyName = 'local';

// so useGuards can resolve it
@Injectable()
export class LocalAuthGuard extends AuthGuard(strategyName) {}
