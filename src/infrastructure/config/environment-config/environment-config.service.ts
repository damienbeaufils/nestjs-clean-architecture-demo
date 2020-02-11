import * as Joi from '@hapi/joi';
import { ValidationResult } from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { EnvironmentConfigError } from './environment-config.error';

export interface EnvironmentConfig {
  [key: string]: string;
}

@Injectable()
export class EnvironmentConfigService {
  private readonly environmentConfig: EnvironmentConfig;

  constructor() {
    this.environmentConfig = EnvironmentConfigService.validateInput({ ...process.env });
  }

  private static validateInput(environmentConfig: EnvironmentConfig): EnvironmentConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3001),
      DATABASE_TYPE: Joi.string().default('sqlite'),
      DATABASE_NAME: Joi.string().default('local-db.sqlite'),
      DATABASE_HOST: Joi.string().when('DATABASE_TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      DATABASE_PORT: Joi.number().when('DATABASE_TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      DATABASE_USERNAME: Joi.string().when('DATABASE_TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
      DATABASE_PASSWORD: Joi.string().when('DATABASE_TYPE', { is: 'sqlite', then: Joi.optional(), otherwise: Joi.required() }),
    }).unknown(true);

    const { error, value: validatedEnvironmentConfig }: ValidationResult = envVarsSchema.validate(environmentConfig);
    if (error) {
      throw new EnvironmentConfigError(`Config validation error: ${error.message}`);
    }

    return validatedEnvironmentConfig;
  }

  get(key: string): string {
    return this.environmentConfig[key];
  }
}
