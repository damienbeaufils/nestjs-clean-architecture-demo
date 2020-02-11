import { Dummy } from '../../domain/dummy';
import { DummyRepository } from '../../domain/dummy.repository';
import { CreateDummyData } from '../create-dummy-data';

jest.mock('../../domain/dummy');

describe('uses_cases/CreateDummyData', () => {
  let createDummyData: CreateDummyData;
  let mockDummyRepository: DummyRepository;

  beforeEach(() => {
    (Dummy as jest.Mock).mockClear();

    mockDummyRepository = {} as DummyRepository;
    mockDummyRepository.save = jest.fn();

    createDummyData = new CreateDummyData(mockDummyRepository);
  });

  describe('execute()', () => {
    it('should create new dummy using given data', async () => {
      // given
      const value: string = 'some dummy value';

      // when
      await createDummyData.execute(value);

      // then
      expect(Dummy).toHaveBeenCalledWith(value);
    });

    it('should save created dummy using repository', async () => {
      // given
      const createdDummy: Dummy = new Dummy('some dummy value');
      (Dummy as jest.Mock).mockImplementation(() => createdDummy);

      // when
      await createDummyData.execute('some dummy value');

      // then
      expect(mockDummyRepository.save).toHaveBeenCalledWith(createdDummy);
    });

    it('should return saved dummy from repository', async () => {
      // given
      const savedDummy: Dummy = { ...new Dummy('some dummy value'), id: 42 };
      (mockDummyRepository.save as jest.Mock).mockReturnValue(Promise.resolve(savedDummy));

      // when
      const result: Dummy = await createDummyData.execute('some dummy value');

      // then
      expect(result).toBe(savedDummy);
    });
  });
});
