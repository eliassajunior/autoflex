import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";
import { globalConfig } from "./global/configs/global.config";
import { globalSchema } from "./global/configs/schemas/global.schema";
import { MaterialModule } from "./modules/material/material.module";
import { ProductModule } from "./modules/product/product.module";
import { ProductionModule } from "./modules/production/production.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ...globalSchema,
      }),
      load: [globalConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [globalConfig.KEY],
      useFactory: async (config: ConfigType<typeof globalConfig>) => {
        return {
          type: "postgres",
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    MaterialModule,
    ProductModule,
    ProductionModule,
  ],
})
export class AppModule {}
