import { Dummy } from '../domain/dummy';
import { DummyRepository } from '../domain/dummy.repository';

export class CreateDummyData {
  constructor(private readonly dummyRepository: DummyRepository) {}

  async execute(value: string): Promise<Dummy> {
    const dummy: Dummy = new Dummy(value);

    return this.dummyRepository.save(dummy);
  }
}
