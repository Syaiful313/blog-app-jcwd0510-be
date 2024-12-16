import express, { Request, Response, NextFunction } from "express";
import sampleRouter from "./routes/sample.router";
import authRouter from "./routes/auth.router";
import blogRouter from "./routes/blog.router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/samples", sampleRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

// middleware error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

export default app;