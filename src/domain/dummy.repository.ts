import { Dummy } from './dummy';

export interface DummyRepository {
  save(dummy: Dummy): Promise<Dummy>;
  findAll(): Promise<Dummy[]>;
}
