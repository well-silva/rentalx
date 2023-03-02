import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import DayjsDateProvider from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './EmailProvider/IMailProvider';
import EtherealMailProvider from './EmailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider());
