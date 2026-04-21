import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error(
      "MONGO_URI is not set. Add it to apps/backend/.env or set SKIP_DB=true for local dev without MongoDB."
    );
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

export default connectDB;