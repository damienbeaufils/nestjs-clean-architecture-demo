import * as fs from 'fs';
import { PathLike } from 'fs';
import * as path from 'path';
import { EnvironmentConfigService } from '../src/infrastructure/config/environment-config/environment-config.service';
import { getTypeOrmMigrationsOptions } from '../src/infrastructure/config/typeorm/typeorm-config.module';

const typeOrmConfigFilePath: PathLike = path.join(__dirname, '../ormconfig.json');
const typeOrmMigrationsOptions: object = getTypeOrmMigrationsOptions(new EnvironmentConfigService());
try {
  fs.unlinkSync(typeOrmConfigFilePath);
} catch (e) {
  // tslint:disable-next-line:no-console
  console.log(`Failed to delete file ${typeOrmConfigFilePath}. Probably because it does not exist.`);
}
fs.writeFileSync(typeOrmConfigFilePath, JSON.stringify([typeOrmMigrationsOptions], null, 2));
