import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Module({})
export class MongooseModule {
    private async connect() {
        try {
            await mongoose.set('strictQuery', true);
            const client = await mongoose.connect(process.env.URI);
            console.log('MongoDB is connected');
        } catch (error) {
          console.error(error);
        }
    }

    async onModuleInit(){
        this.connect();
    }
}
