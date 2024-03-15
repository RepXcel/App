// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Session } = initSchema(schema);

export {
  User,
  Session
};