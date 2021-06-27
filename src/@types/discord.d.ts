import Discord from 'discord.js';

export interface Channel extends Discord.Channel {
  send: (content) => Promise<void>;
}
