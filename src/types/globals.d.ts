import { InstanceType } from 'typegoose';
import { User } from '../models/User';

/**
 * Extending the Request Interface to hold the user
 * in authenticated state.
 */
declare global {
  namespace Express {
    interface Request {
      user: InstanceType<User>;
    }
  }
}
