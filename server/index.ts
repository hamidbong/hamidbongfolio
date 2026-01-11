import express, { type Request, Response, NextFunction } from "express";
import { serveStatic } from "./static";
import { createServer } from "http";import net from "net";
const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

(async () => {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const startPort = parseInt(process.env.PORT || "5000", 10);

  const isPortFree = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const tester = net
        .createServer()
        .once("error", (err: any) => {
          if (err && err.code === "EADDRINUSE") {
            resolve(false);
          } else {
            resolve(false);
          }
        })
        .once("listening", () => {
          tester.close(() => resolve(true));
        })
        .listen({ port, host: "0.0.0.0" });
    });
  };

  let chosenPort = startPort;
  for (let i = 0; i < 20; i++) {
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(chosenPort);
    if (free) break;
    log(`port ${chosenPort} in use, trying ${chosenPort + 1}`);
    chosenPort += 1;
  }

  httpServer.listen(
    {
      port: chosenPort,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${chosenPort}`);
    },
  );
})();
