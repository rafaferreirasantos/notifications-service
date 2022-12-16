import { Module } from '@nestjs/common';
import { SendNotification } from "src/app/use-cases/send-notification";
import { DatabaseModule } from "./infra/database/database.module";
import { HttpModule } from "./infra/http/http.module";

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule { }
