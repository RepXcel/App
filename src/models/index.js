// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Session, Velocity } = initSchema(schema);

export {
  User,
  Session,
  Velocity
};