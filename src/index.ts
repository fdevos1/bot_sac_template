import { create, Message } from "venom-bot";

import { CheckUserAlreadyExist } from "./functions/CheckUserAlreadyExist";
import { CreateUser } from "./services/postServices";
import { buttons, serviceButtons } from "./utils/buttonJSON";

const client = create({
  session: "pandorga",
  multidevice: true,
  folderNameToken: "tokens",
  mkdirFolderToken: "./data/app",
  createPathFileToken: true,
}).then((client: any) => start(client));

function start(client: any) {
  client.onMessage(async (msg: Message) => {
    const msgSender = msg.from;
    const msgReceived = msg.body.toLowerCase();

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

    const sendServiceButtons = async (user: string) =>
      await client.sendButtons(
        user,
        "Saiba mais de nossos serviços.",
        serviceButtons,
        "Selecione uma opção abaixo:"
      );

    if (!CheckDb) {
      CreateUser({
        name: msg.author,
        cellphone: msg.from.replace("@c.us", ""),
        wa_id: msgSender,
      });
    }

    if (msg.type === "chat") {
      try {
        await client.sendButtons(
          msgSender,
          "Olá seja bem-vindo ao WhatsApp da empresa Pandorga Tech.\n\nQuer saber um pouco mais de quem somos?",
          buttons,
          "Selecione uma opção abaixo:"
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (msgReceived === "quem somos") {
      try {
        await client.sendText(
          msgSender,
          "Iniciamos nossa trajetória de trabalho na política ainda na adolescencia, desde 2016 atuamos profissionalmente em campanhas eleitorais.\nEm 2022 decidimos abrir nossa empresa focando nossos esforços nas atividades das quais mais nos destacavamos, criamos uma empresa de tecnologia focada em resultados práticos para campanhas.\n\nJá na campanha de 2022 atendemos mais de 40 clientes de diversos estados, abaixo um pouco dos nossos números da eleição:\n- Desenvolvemos estratégia e gerenciamos mais de 1 milhão de reais em anúncios via Meta Ads.\n- Ajudamos diversas agências a entender melhor o tráfego pago para campanhas eleitorais.\n- Enviamos e respondemos mais de 500 mil mensagens de whatsapp dos nossos clientes.\n- Multiplicamos dezenas de vezes as bases de dados dos nossos clientes.\n- Criamos mais de 60 horas de vídeos.\n- Registramos 16.754 fotos.\n- Materializamos 1.686 vídeos.\n- Produzimos mais de 3.000 cards."
        );

        await sendServiceButtons(msgSender);
      } catch (err) {
        console.log(err);
      }
    }

    if (msgReceived === "estratégia e gestão de tráfego pago") {
      await client.sendText(
        msgSender,
        "O tráfego pago foi a arma do arsenal digital mais utilizada na campanha de 2022, nós desenvolvemos a estratégia e gerenciamos mais de 1 milhão de reais em anúncios via Meta Ads, somente nas eleições de 2022. Além disso ajudamos diversas agências a entender melhor o tráfego pago para campanhas eleitorais. Nos especializamos em gestão de tráfego pago para campanhas eleitorais, governos, mandatos, política e defesa de interesses sociais."
      );
      await sendServiceButtons(msgSender);
    }

    if (msgReceived === "estratégia e gestão de whatsapp") {
      await client.sendText(
        msgSender,
        "Unimos nesse serviço 3 expertises, tráfego pago, gestão de whatsapp e nosso bot exclusivo de whatsapp. Criamos um funil, utilizando tráfego pago para levar o cliente/eleitor até o seu whatsapp, convertendo as suas conversas em resultados reais."
      );
      await sendServiceButtons(msgSender);
    }

    if (msgReceived === "bot whatsapp personalizado") {
      await client.sendText(
        msgSender,
        "Você deve ter escutado falar de muitos bots para whatsapp, mas nenhum é 100% personalizado e criado especificamente para você e seu negócio."
      );
      await sendServiceButtons(msgSender);
    }
  });
}
