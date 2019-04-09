import { Typegoose, prop, arrayProp, instanceMethod } from 'typegoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Todo } from './Todo';

export class User extends Typegoose {
  public _id: string;

  @prop({ required: true, index: true, unique: true, lowercase: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @arrayProp({ items: Todo })
  public todos: Todo[];

  @instanceMethod
  public async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  }

  @instanceMethod
  public async isMatchingPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }

  @instanceMethod
  public generateAuthToken(): string {
    const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';
    return jwt.sign({ _id: this._id }, JWT_SECRET);
  }
}

export const UserModel = new User().getModelForClass(User);
