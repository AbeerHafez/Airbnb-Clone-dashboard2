export interface Category {
  _id:string,
  displayName:string,
  technicalName:string,
  icon:string,
  show:boolean,

}


// @Schema()
// export class Category extends Document {
//   @Prop({ required: true, unique: true })
//   displayName: string;

//   @Prop({ required: true })
//   technicalName: string;

//   @Prop({ required: true })
//   icon: string;

//   @Prop({ required: true })
//   show: boolean;
// }

// export const CategorySchema = SchemaFactory.createForClass(Category);

