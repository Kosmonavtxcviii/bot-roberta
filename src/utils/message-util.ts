import Discord from 'discord.js';
import _ from 'lodash';
import { Channel } from '~/@types/discord';
import { AppConst } from '~/constants/app.const';

/**
 * TODO
 *
 * @export
 * @class MessageUtil
 */
export class MessageUtil {
  /**
   * TODO
   *
   * @static
   * @param {string} content
   * @return {*}  {string}
   * @memberof MessageUtil
   */
  static createExecutable (content: string): string {
    return content.startsWith(AppConst.COMMAND_PREFIX)
      ? content.replace(AppConst.COMMAND_PREFIX, '').trim()
      : content;
  }

  /**
   * TODO
   *
   * @static
   * @param {Discord.Message} message
   * @return {*}  {Discord.Collection<string, Discord.GuildChannel>}
   * @memberof MessageUtil
   */
  static getTextChannels (message: Discord.Message): Discord.Collection<string, Discord.GuildChannel> {
    return (message.channel as Discord.TextChannel).guild.channels.cache;
  }

  /**
   * TODO
   *
   * @static
   * @param {Discord.Collection<string, Discord.GuildChannel>} channels
   * @param {Discord.GuildChannel['type']} type
   * @return {*}  {Discord.Collection<string, Discord.GuildChannel>}
   * @memberof MessageUtil
   */
  static filterChannelByType (
    channels: Discord.Collection<string, Discord.GuildChannel>,
    type: Discord.GuildChannel['type']
  ): Discord.Collection<string, Discord.GuildChannel> {
    return channels.filter((channel) => channel.type === type);
  }

  /**
   * TODO
   *
   * @static
   * @param {Discord.Collection<string, Discord.GuildChannel>} channels
   * @return {*}  {Discord.Collection<string, Discord.GuildChannel>}
   * @memberof MessageUtil
   */
  static sortChannelsByRawPosition (
    channels: Discord.Collection<string, Discord.GuildChannel>
  ): Discord.Collection<string, Discord.GuildChannel> {
    return channels.sort((cur, next) => {
      if (cur.rawPosition < next.rawPosition) return -1;
      if (cur.rawPosition > next.rawPosition) return 1;
      return 0;
    });
  }

  /**
   * TODO
   *
   * @static
   * @param {Discord.Collection<string, Discord.GuildChannel>} textChannels
   * @return {*}  {(Channel | undefined)}
   * @memberof MessageUtil
   */
  static getUrlChannel (textChannels: Discord.Collection<string, Discord.GuildChannel>): Channel | undefined {
    return textChannels.find((textChannel) => textChannel.name === 'url') as Channel | undefined;
  }

  /**
   * TODO
   *
   * @static
   * @param {string} title
   * @param {Array<{ title: string, content: string }>} metaDataList
   * @param {string[]} content
   * @return {*}  {string}
   * @memberof MessageUtil
   */
  static createNotificationMessage (
    title: string,
    metaDataList: Array<{ title: string, content: string }>,
    content: string[]
  ): string {
    return [
      `**[${_.toUpper(title)}]**`,
      ...metaDataList.map((metaData) => `    **${metaData.title}:** ${metaData.content}`),
      ...(content.length > 0 ? ['', ...content] : [])
    ].join('\n');
  }
}
