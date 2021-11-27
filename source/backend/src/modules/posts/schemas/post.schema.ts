import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type PostDocument = Post & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  user_uid: string;

  @Prop()
  page: string

  @Prop()
  postId: string
  
  @Prop()
  title: string;

  @Prop()
  content: string;

}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ user_uid: 'text' });

export { PostSchema };
