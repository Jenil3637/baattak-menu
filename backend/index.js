import express, { urlencoded } from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import CartRoutes from "./routes/Cart.routes.js";
import UserRoutes from "./routes/User.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "https://baattak.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, // Allow sending cookies and other credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Include custom headers if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle Preflight Requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        // Handle the preflight request
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify specific origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
        return res.status(200).end(); // Respond with 200 OK and terminate the response
    }
    next(); // Pass the request to the next middleware
});

// Routes
app.use("/api/v1/customer", CartRoutes);
app.use("/api/v1/customer", UserRoutes);

// Database connection and server start
const port = process.env.PORT || 3001;

app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
});
