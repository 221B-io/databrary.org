import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { KeycloakModule } from './keycloak/keycloak.module'
import { HasuraModule } from './hasura/hasura.module'
import { MinioModule } from './minio/minio.module'
import { TaskModule } from './task/task.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      isGlobal: true
    }),
    KeycloakModule,
    HasuraModule,
    MinioModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
