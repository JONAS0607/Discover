import { Request, Response } from "express";

import { EmailService } from "../services/EmailService";

const users = [
  { name: "jonas", email: "cabral.j@unoesc.edu.br" },
  { name: "nicolle", email: "nicolle.c@gmail.com" },
];

export default {
  async index(req: Request, res: Response) {
    return res.json(users);
  },
  async create(req: Request, res: Response) {
    const emailService = new EmailService();

    emailService.sendMail({
      to: {
        name: "jonas",
        email: "cabral.j@unoesc.edu.br",
      },
      message: {
        subject: "Seja Bem vindo ao Sistema",
        body: "Obrigado por escolher a Jc-Softwares",
      },
    });

    res.send(`Email enviado com sucesso! `);
  },
};
