interface EmailTo {
  name: string;
  email: string;
}
interface EmailMessage {
  subject: string;
  body: string;
  //anexos pode ser que tenha ou não por isso a interrogação
  attachment?: string[];
}
interface MessageDTO {
  to: EmailTo;
  message: EmailMessage;
}

interface IEmailService {
  sendMail(request: MessageDTO): void;
}

export class EmailService implements IEmailService {
  sendMail({ to, message }: MessageDTO) {
    console.log(`Email enviado para: ${to.name}: ${message.subject}`);
  }
}
