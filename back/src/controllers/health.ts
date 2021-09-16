import { Request, Response } from 'express';

/**
 * Get the health of the server
 * @route GET /health
 * @returns {object} 200 - An object with uptime, message and date
 * @returns {Error}  404 - Unexpected error
 */
export const getHealth = async (req: Request, res: Response) => { 
    try {
        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date()
          }
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: "erreur" });
    }
}
