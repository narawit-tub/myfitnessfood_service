import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const strategyName = 'local';

@Injectable()
export class LocalAuthGuard extends AuthGuard(strategyName) {}
