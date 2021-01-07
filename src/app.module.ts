import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [ProductsModule, RecipesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
