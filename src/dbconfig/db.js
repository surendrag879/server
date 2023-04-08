import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const DATABASE_URL = process.env.mode === "production"
    ? "mongodb+srv://surendrakg:jkbHb7wI4GNZqu6L@cluster.7uhmgbd.mongodb.net/Students"
    : "mongodb://127.0.0.1:27017/Students";
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
//connect database
export const connectdb = mongoose.connect(DATABASE_URL,DB_OPTIONS)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database failed: ", error));
