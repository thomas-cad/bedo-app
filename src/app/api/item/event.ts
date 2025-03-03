import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany({
        orderBy: { date: "asc" },
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors du chargement des événements" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
