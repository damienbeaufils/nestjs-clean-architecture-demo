import { isEmpty } from 'lodash';
import { InvalidDummyError } from './invalid-dummy.error';
import { DummyId } from './type-aliases';

export class Dummy {
  id: DummyId;
  value: string;

  constructor(value: string) {
    if (isEmpty(value)) {
      throw new InvalidDummyError('value cannot be null or empty');
    }
    this.value = value;
  }
}
