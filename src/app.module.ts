import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProgramBuilderModule } from './modules/program-builder/program-builder.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';

@Module({
  imports: [ProgramBuilderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users/me');
  }
}
