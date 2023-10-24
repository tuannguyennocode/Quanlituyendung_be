import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class CommonSchemaProps {
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  createdBy: string;
  @Prop()
  updatedBy: string;
}
