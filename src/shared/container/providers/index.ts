import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import DayjsDateProvider from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './EmailProvider/IMailProvider';
import EtherealMailProvider from './EmailProvider/implementations/EtherealMailProvider';
import LocalStogareProvider from './StorageProvider/implementations/LocalStorageProvide';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider());

const diskStorage = {
  local: LocalStogareProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[process.env.DISK]);