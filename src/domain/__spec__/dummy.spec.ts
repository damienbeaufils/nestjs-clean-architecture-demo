import { Dummy } from '../dummy';
import { InvalidDummyError } from '../invalid-dummy.error';

describe('domain/Dummy', () => {
  describe('constructor()', () => {
    it('should bind value', () => {
      // given
      const value: string = 'a value';

      // when
      const result: Dummy = new Dummy(value);

      // then
      expect(result.value).toBe('a value');
    });

    it('should fail when value is null', () => {
      // given
      const value: string = null;

      // when
      const result = () => new Dummy(value);

      // then
      expect(result).toThrow(new InvalidDummyError('value cannot be null or empty'));
    });

    it('should fail when value is empty', () => {
      // given
      const value: string = '';

      // when
      const result = () => new Dummy(value);

      // then
      expect(result).toThrow(new InvalidDummyError('value cannot be null or empty'));
    });
  });
});
