import { container } from 'tsyringe';

import LocalStogareProvider from './implementations/LocalStorageProvide';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './IStorageProvider';

const diskStorage = {
  local: LocalStogareProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[process.env.DISK]);
