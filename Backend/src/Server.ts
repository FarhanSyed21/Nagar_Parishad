import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import contractorRoutes from "./routes/contractorRoutes";
import bankRoutes from "./routes/bankRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contractors", contractorRoutes);
app.use("/api/banks", bankRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});