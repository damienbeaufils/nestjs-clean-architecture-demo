import { EnvironmentConfigError } from '../environment-config.error';
import { EnvironmentConfigService } from '../environment-config.service';
import ProcessEnv = NodeJS.ProcessEnv;

describe('infrastructure/config/environment-config/EnvironmentConfigService', () => {
  beforeEach(() => {
    const env: ProcessEnv = {
      PORT: '1111',
      DATABASE_TYPE: 'database-type',
      DATABASE_HOST: 'database-host',
      DATABASE_PORT: '1234',
      DATABASE_USERNAME: 'database-username',
      DATABASE_PASSWORD: 'database-password',
      DATABASE_NAME: 'database-name',
    } as ProcessEnv;

    process.env = {
      ...process.env,
      ...env,
    };
  });

  describe('constructor()', () => {
    it('should allow unknown variables', () => {
      // given
      process.env.UNKNOWN = 'any-value';

      // when
      const result = () => new EnvironmentConfigService();

      // then
      expect(result).not.toThrow();
    });

    describe('PORT', () => {
      it('should fail when not a number', () => {
        // given
        process.env.PORT = 'not-a-number';

        // when
        const result = () => new EnvironmentConfigService();

        // then
        expect(result).toThrow(new EnvironmentConfigError('Config validation error: "PORT" must be a number'));
      });
      it('should be defaulted to 3001', () => {
        // given
        process.env.PORT = undefined;

        // when
        const result: EnvironmentConfigService = new EnvironmentConfigService();

        // then
        expect(result.get('PORT')).toBe(3001);
      });
    });

    describe('DATABASE_TYPE', () => {
      it('should be defaulted to sqlite', () => {
        // given
        process.env.DATABASE_TYPE = undefined;

        // when
        const result: EnvironmentConfigService = new EnvironmentConfigService();

        // then
        expect(result.get('DATABASE_TYPE')).toBe('sqlite');
      });
    });

    describe('DATABASE_NAME', () => {
      it('should be defaulted to local-db.sqlite', () => {
        // given
        process.env.DATABASE_NAME = undefined;

        // when
        const result: EnvironmentConfigService = new EnvironmentConfigService();

        // then
        expect(result.get('DATABASE_NAME')).toBe('local-db.sqlite');
      });
    });

    describe('when DATABASE_TYPE is postgres', () => {
      beforeEach(() => {
        process.env.DATABASE_TYPE = 'postgres';
      });

      describe('DATABASE_HOST', () => {
        it('should fail when empty', () => {
          // given
          process.env.DATABASE_HOST = '';

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).toThrow(new EnvironmentConfigError('Config validation error: "DATABASE_HOST" is not allowed to be empty'));
        });
      });

      describe('DATABASE_PORT', () => {
        it('should fail when not a number', () => {
          // given
          process.env.DATABASE_PORT = 'not-a-number';

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).toThrow(new EnvironmentConfigError('Config validation error: "DATABASE_PORT" must be a number'));
        });
      });

      describe('DATABASE_USERNAME', () => {
        it('should fail when empty', () => {
          // given
          process.env.DATABASE_USERNAME = '';

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).toThrow(new EnvironmentConfigError('Config validation error: "DATABASE_USERNAME" is not allowed to be empty'));
        });
      });

      describe('DATABASE_PASSWORD', () => {
        it('should fail when empty', () => {
          // given
          process.env.DATABASE_PASSWORD = '';

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).toThrow(new EnvironmentConfigError('Config validation error: "DATABASE_PASSWORD" is not allowed to be empty'));
        });
      });
    });

    describe('when DATABASE_TYPE is sqlite', () => {
      beforeEach(() => {
        process.env.DATABASE_TYPE = 'sqlite';
      });

      describe('DATABASE_HOST', () => {
        it('should be optional', () => {
          // given
          process.env.DATABASE_HOST = undefined;

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).not.toThrow();
        });
      });

      describe('DATABASE_PORT', () => {
        it('should be optional', () => {
          // given
          process.env.DATABASE_PORT = undefined;

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).not.toThrow();
        });
      });

      describe('DATABASE_USERNAME', () => {
        it('should be optional', () => {
          // given
          process.env.DATABASE_USERNAME = undefined;

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).not.toThrow();
        });
      });

      describe('DATABASE_PASSWORD', () => {
        it('should be optional', () => {
          // given
          process.env.DATABASE_PASSWORD = undefined;

          // when
          const result = () => new EnvironmentConfigService();

          // then
          expect(result).not.toThrow();
        });
      });
    });
  });

  describe('get()', () => {
    it('should return variable from process.env', () => {
      // given
      const expected: string = 'any value';
      process.env.TEST_ENV_VAR = expected;
      const environmentConfigService: EnvironmentConfigService = new EnvironmentConfigService();

      // when
      const result: string = environmentConfigService.get('TEST_ENV_VAR');

      // then
      expect(result).toBe(expected);
    });
  });
});
