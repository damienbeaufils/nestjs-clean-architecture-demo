import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Dummy } from '../../src/domain/dummy';
import { EnvironmentConfigService } from '../../src/infrastructure/config/environment-config/environment-config.service';
import { DatabaseDummyRepository } from '../../src/infrastructure/repositories/database-dummy.repository';
import { DummyEntity } from '../../src/infrastructure/repositories/entities/dummy.entity';
import { RepositoriesModule } from '../../src/infrastructure/repositories/repositories.module';
import { e2eEnvironmentConfigService } from '../e2e-config';
import { runDatabaseMigrations } from './database-e2e.utils';

describe('infrastructure/repositories/DatabaseDummyRepository', () => {
  let app: INestApplication;
  let databaseDummyRepository: DatabaseDummyRepository;
  let dummyEntityRepository: Repository<DummyEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RepositoriesModule],
    })
      .overrideProvider(EnvironmentConfigService)
      .useValue(e2eEnvironmentConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await runDatabaseMigrations(app.get(EnvironmentConfigService));

    databaseDummyRepository = app.get(DatabaseDummyRepository);
    // @ts-ignore
    dummyEntityRepository = databaseDummyRepository.dummyEntityRepository;
  });

  beforeEach(async () => {
    await dummyEntityRepository.clear();
  });

  describe('save()', () => {
    it('should persist dummy in database', async () => {
      // given
      const dummyWithoutId: Dummy = { value: 'a-value' } as Dummy;

      // when
      await databaseDummyRepository.save(dummyWithoutId);

      // then
      const count: number = await dummyEntityRepository.count();
      expect(count).toBe(1);
    });

    it('should return saved dummy with an id', async () => {
      // given
      const dummyWithoutId: Dummy = { value: 'a-value' } as Dummy;

      // when
      const result: Dummy = await databaseDummyRepository.save(dummyWithoutId);

      // then
      expect(result.id).toBeDefined();
    });
  });

  describe('findAll()', () => {
    it('should return all dummies when in database', async () => {
      // given
      await databaseDummyRepository.save({ value: 'a-value' } as Dummy);
      await databaseDummyRepository.save({ value: 'another-value' } as Dummy);

      // when
      const result: Dummy[] = await databaseDummyRepository.findAll();

      // then
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no dummy found', async () => {
      // when
      const result: Dummy[] = await databaseDummyRepository.findAll();

      // then
      expect(result).toHaveLength(0);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
