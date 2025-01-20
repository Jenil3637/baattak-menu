import express, { urlencoded } from "express"; 
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import CartRoutes from "./routes/Cart.routes.js";
import UserRoutes from "./routes/User.routes.js";

const app = express();
  
        
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: ["http://localhost:5173" , "http://localhost:5174" , "https://baattak.vercel.app"],
    credentials: true,
  };

app.use(cors(corsOptions));


app.use("/api/v1/customer",CartRoutes)
app.use("/api/v1/customer",UserRoutes)


const port = process.env.PORT || 3001;
app.listen(port, () => {
    connectDB()
  console.log(`Server running on port ${port}`); 
});
