import { create, Whatsapp } from "venom-bot";

export default async function CreateWhatsAppClient(): Promise<Whatsapp> {
  try {
    const client = await create({
      session: "pandorga",
      multidevice: true,
      folderNameToken: "tokens",
      mkdirFolderToken: "./data/app",
      createPathFileToken: true,
    });

    return client;
  } catch (err: any) {
    return err;
  }
}
