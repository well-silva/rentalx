import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  console.log('teste');

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? 'rentalx_test' : defaultOptions.database,
    })
  );
};
