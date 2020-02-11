import { Dummy } from '../domain/dummy';
import { DummyRepository } from '../domain/dummy.repository';

export class GetAllDummyData {
  constructor(private readonly dummyRepository: DummyRepository) {}

  async execute(): Promise<Dummy[]> {
    return this.dummyRepository.findAll();
  }
}
