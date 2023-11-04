import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed/seeder.module';
import { ReportSeederService } from './seed/report.seeder.service';

async function seed() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  const seeder = appContext.get(ReportSeederService);
  await seeder
    .seedMultipleReports(70)
    .then(() => {
      console.log('Seeding complete!');
    })
    .catch((error) => {
      console.error('Seeding failed!', error);
    })
    .finally(() => appContext.close());
}

seed();
