import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
 
export const client = new MailtrapClient({token: process.env.MAILTRAP_API_TOKEN! });



export const sender = {
  email: "hello@demomailtrap.co",
  name: "OrderEase",
};
const recipients = [
  {
    email: "abhishekadarsh1808@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);