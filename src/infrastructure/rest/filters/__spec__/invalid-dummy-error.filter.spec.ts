import { ArgumentsHost } from '@nestjs/common';
import { InvalidDummyError } from '../../../../domain/invalid-dummy.error';
import { InvalidDummyErrorFilter } from '../invalid-dummy-error.filter';

describe('infrastructure/rest/filters/InvalidDummyErrorFilter', () => {
  let invalidDummyErrorFilter: InvalidDummyErrorFilter;
  let mockArgumentsHost: ArgumentsHost;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();

    mockStatus.mockImplementation(() => {
      return {
        json: mockJson,
      };
    });

    mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: mockStatus,
        }),
      }),
    } as ArgumentsHost;

    invalidDummyErrorFilter = new InvalidDummyErrorFilter();
  });

  describe('catch()', () => {
    it('should call response status method with http bad request status code', () => {
      // given
      const invalidDummyError: InvalidDummyError = {} as InvalidDummyError;
      const expected: number = 400;

      // when
      invalidDummyErrorFilter.catch(invalidDummyError, mockArgumentsHost);

      // then
      expect(mockStatus).toHaveBeenCalledWith(expected);
    });

    it('should call response status json method with body from invalid dummy error', () => {
      // given
      const fixedDate: Date = new Date('2017-06-13T04:41:20');
      // @ts-ignore
      jest.spyOn(global, 'Date').mockImplementationOnce(() => fixedDate);

      const invalidDummyError: InvalidDummyError = {
        name: 'InvalidDummyError',
        message: 'A dummy validation error',
      } as InvalidDummyError;

      const expected: object = {
        statusCode: 400,
        timestamp: fixedDate.toISOString(),
        name: 'InvalidDummyError',
        message: 'A dummy validation error',
      };

      // when
      invalidDummyErrorFilter.catch(invalidDummyError, mockArgumentsHost);

      // then
      expect(mockJson).toHaveBeenCalledWith(expected);
    });
  });
});
