import express, { Express, Request, Response } from "express";
import cardInfrastructure from "../../Kitted/packages/card-service/src/infrastructure";
import authInfrastructure from "../../Kitted/packages/auth-service/src/infrastructure";

const services = [authInfrastructure, cardInfrastructure];

const spinUpService = (domain: string, port: number) => {
  const app: Express = express();

  // Proxy for all services
  app.all("*", async (req: Request, res: Response) => {
    console.log(
      `[${req.socket.remoteAddress}]: ${req.protocol}://${req.get("host")}${
        req.url
      }`
    );

    res.send("Express + TypeScript Server");
    console.log("----------");
  });

  app.listen(port, () => {
    console.log(
      `⚡️[${domain}]: Server is running at http://localhost:${port}`
    );
  });
};

spinUpService("kitted.app", 8888);
