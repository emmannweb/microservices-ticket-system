import mongoose from "mongoose";
// An interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

export interface UserDocMethod extends UserDoc, mongoose.Document {
  getJwtToken: () => string;
}
