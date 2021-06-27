import Discord from 'discord.js';
import { AppConst } from '~/constants/app.const';
import { handleUrlFowarding } from '~/handlers/url-fowarding-handler';
import { handleInfo } from '~/handlers/info-handler';
import { MessageUtil } from '~/utils/message-util';

export async function handleMessage (client: Discord.Client, message: Discord.Message): Promise<void> {
  const channel = message.channel as Discord.TextChannel;
  const content = message.content;
  const author = message.author;
  const isExecutable = content.startsWith(AppConst.COMMAND_PREFIX) || channel.name === AppConst.CLI_CHANNEL_NAME;

  // console.log(message);

  // Botからのメッセージは無視 (無限ループ対策)
  if (author.bot) return;

  // URL チャンネル関連機能
  if (channel.name !== 'url') handleUrlFowarding(client, message);

  if (!isExecutable) return;

  const executable = MessageUtil.createExecutable(content);

  if (!executable || executable === 'info') handleInfo(client, message);

  if (executable === 'greet') {
    message.reply(`Hello ${author.username} !`);
  }

  // if (executable === 'update') {
  //   const cycle = Array.from({ length: 10 }, (_, index) => `${(index + 1) * 10}%`);

  //   let cycleIndex = 0;

  //   message.channel.send('Updating test').then((message) => {
  //     const intervalId = setInterval(() => {
  //       message.edit([
  //         `status: ${cycle[cycleIndex]} transfered.`
  //       ].join('\n'));

  //       cycleIndex++;
  //       if (cycleIndex === cycle.length) cycleIndex = 0;
  //     }, 1000);
  //     const timeoutId = setTimeout(() => {
  //       message.edit('status: done :white_check_mark:');
  //       clearInterval(intervalId);
  //       clearTimeout(timeoutId);
  //     }, 10000);
  //   });
  // }
}
