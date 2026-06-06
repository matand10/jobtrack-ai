import { Request, Response } from "express";


class HealthController {
    public getHealth(req: Request, res: Response) {
        res.status(200).json({ status: "ok" });
    }
}

export const healthController = new HealthController();