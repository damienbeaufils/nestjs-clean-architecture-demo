import { Dummy } from '../../domain/dummy';
import { DummyRepository } from '../../domain/dummy.repository';
import { GetAllDummyData } from '../get-all-dummy-data';

describe('uses_cases/GetAllDummyData', () => {
  let getAllDummyData: GetAllDummyData;
  let mockDummyRepository: DummyRepository;

  beforeEach(() => {
    mockDummyRepository = {} as DummyRepository;
    mockDummyRepository.findAll = jest.fn();

    getAllDummyData = new GetAllDummyData(mockDummyRepository);
  });

  describe('execute()', () => {
    it('should return found dummy data from repository', async () => {
      // given
      const dummy1: Dummy = new Dummy('some dummy value 1');
      const dummy2: Dummy = new Dummy('some dummy value 2');
      (mockDummyRepository.findAll as jest.Mock).mockReturnValue(Promise.resolve([dummy1, dummy2]));

      // when
      const result: Dummy[] = await getAllDummyData.execute();

      // then
      expect(result).toStrictEqual([dummy1, dummy2]);
    });
  });
});
