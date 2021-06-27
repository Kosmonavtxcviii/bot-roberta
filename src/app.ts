import Discord from 'discord.js';
import Dotenv from 'dotenv';

import { handleMessage } from '~/handlers/message-handler';

async function main (): Promise<void> {
  Dotenv.config();

  const accessToken: string | undefined = process.env.ACCESS_TOKEN;

  if (!accessToken) {
    console.error([
      "The environment variable 'ACCESS_TOKEN' is not specified.",
      "Create a file named '.env' in this repository root and write the following",
      '',
      "    'ACCESS_TOKEN=<your access token>'",
      ''
    ].join('\n'));

    process.exit(2);
  }

  const client: Discord.Client = new Discord.Client();

  client.on('message', async (message: Discord.Message): Promise<void> => await handleMessage(client, message));

  await client.login(accessToken);
  console.log('Successfully logged in to Discord!');
}

main();
