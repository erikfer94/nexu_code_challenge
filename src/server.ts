import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config/config";
import { createServer } from "http";
import routes from "./routes";

dotenv.config();

if (!PORT) {
  process.exit(1);
}

const app = express();
export const server = createServer(app);

app.use(helmet());

app.use(
  cors({
    origin: function (_origin, callback) {
      // @ts-ignore
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(routes);
app.use(cookieParser());

export function setupServer() {
  return new Promise((resolve, reject) => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      resolve(true);
    });
  });
}

export default app;
