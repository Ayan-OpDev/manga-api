import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import manga from "./routers/manga";
import chapter from "./routers/chapter";
import cors from "cors";
import helmet from "helmet";

app.use(cors());
app.use(helmet());
app.use("/api", manga);
app.use(express.static("./public"));
app.use("/api/chapter", chapter);
app.use("/api", (_req: Request, res: Response) => {
  res.send({
    status: true,
    message:
      "Welcome",
    find_me_on: {
      github: "https://github.com/Ayan-OpDev/manga-api",
    },
  });
});
app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "api path not found",
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel
export default app;
