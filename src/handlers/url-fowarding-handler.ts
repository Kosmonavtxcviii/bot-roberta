import Discord from 'discord.js';
import Dayjs from 'dayjs';
import { Channel } from '~/@types/discord';
import { AppConst } from '~/constants/app.const';
import { MessageUtil } from '~/utils/message-util';

export async function handleUrlFowarding (client: Discord.Client, message: Discord.Message): Promise<void> {
  const content = message.content;
  const author = message.author;

  if (AppConst.URL_REGEXP.test(content) && !content.startsWith('!')) {
    let textChannels = MessageUtil.filterChannelByType(MessageUtil.getTextChannels(message), 'text');

    // url という名称のチャンネルが存在しなければ作成する
    if (!MessageUtil.getUrlChannel(textChannels)) {
      const creationResult = await message.guild?.channels.create('url', { type: 'text' });

      creationResult?.send(MessageUtil.createNotificationMessage(
        'CHANNEL AUTO GENERATED',
        [
          { title: 'Created by', content: `<@${client.user?.id}>` },
          { title: 'Created at', content: `${Dayjs().format('YYYY/MM/DD HH:mm:ss')}` },
          { title: 'Reason', content: "A channel named 'url' is required for the URL forwarding feature." }
        ],
        []
      ));

      textChannels = MessageUtil.filterChannelByType(MessageUtil.getTextChannels(message), 'text');
    }

    const urlChannel: Channel = MessageUtil.getUrlChannel(textChannels) as Channel;

    await urlChannel.send(MessageUtil.createNotificationMessage(
      'URL HAS BEEN FORWARDED',
      [
        { title: 'Author', content: `<@${author.id}>` },
        { title: 'Sent at', content: `${Dayjs(message.createdTimestamp).format('YYYY/MM/DD HH:mm:ss')}` },
        { title: 'Reason', content: "it was sent to channel other than the 'url' named channel." }
      ],
      [content]
    ));

    await message.delete();
  }
}
