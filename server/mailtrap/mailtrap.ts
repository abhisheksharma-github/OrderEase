// mail send karenga sabko

import { MailtrapClient } from "mailtrap"

const TOKEN = "4404175de4a5a5cab539887af2abea65";

const ENDPOINT="http://send.api.mailtrap.io/"

export const client = new MailtrapClient({token: process.env.MAILTRAP_API_TOKEN! });


export const sender =  {
  email: "hello@demomailtrap.co",
  name: "OrderEase",
};