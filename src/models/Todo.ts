import { Typegoose, prop } from 'typegoose';

export class Todo extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop({ default: false })
  public isDone: boolean;
}

export const TodoModel = new Todo().getModelForClass(Todo);
