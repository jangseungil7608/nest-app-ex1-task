import { Module } from '@nestjs/common';
import { EstateTransactionModule } from './modules/town-planning/estate-transation/estate-transaction.module';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [EstateTransactionModule],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
