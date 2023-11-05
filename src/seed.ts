import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed/seeder.module';
import { AsNumberSeederService } from './seed/as-number.seeder.service';
import { TimelineGraphSeederService } from './seed/timeline-graph.seeder.service';

async function seed() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  try {
    const asNumberSeeder = appContext.get(AsNumberSeederService);
    await asNumberSeeder.seedMultipleReports(10);
    console.log('AS Number Seeding complete!');

    const timelineSeeder = appContext.get(TimelineGraphSeederService);
    await timelineSeeder.seedMultipleTimeLineData(10);
    console.log('Timeline Graph Seeding complete!');
  } catch (error) {
    console.error('Seeding failed!', error);
  } finally {
    await appContext.close();
  }
}

seed();
