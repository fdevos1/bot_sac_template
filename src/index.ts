import CreateWhatsAppClient from "./createWhatsAppClient";
import { Message } from "venom-bot";

import { CheckUserAlreadyExist } from "./functions/CheckUserAlreadyExist";
import { CreateUser } from "./services/postServices";

const client = CreateWhatsAppClient().then((client: any) => start(client));

function start(client: any) {
  client.onMessage(async (msg: Message) => {
    const msgSender = msg.from;
    const msgReceived = msg.body;

    const CheckDb = await CheckUserAlreadyExist(msgSender);

    const sendList = async (
      user: string,
      title: string,
      subtitle: string,
      description: string,
      menu: string,
      list: JSON[]
    ) =>
      await client.sendListMenu(user, title, subtitle, description, menu, list);

    if (!CheckDb) {
      CreateUser({
        name: msg.author,
        cellphone: msg.from.replace("@c.us", ""),
        wa_id: msgSender,
      });
    }
  });
}
