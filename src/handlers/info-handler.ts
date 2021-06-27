import Discord from 'discord.js';
import { AppConst } from '~/constants/app.const';

export async function handleInfo (client: Discord.Client, message: Discord.Message): Promise<void> {
  const channel = message.channel as Discord.TextChannel;

  const content = [
    '\n',
    '```diff',
    '+  `7MM"""Yp,           mm       `7MM"""Mq.          *MM                           mm            ',
    '+    MM    Yb           MM         MM   `MM.          MM                           MM            ',
    '+    MM    dP  ,pW"Wq.mmMMmm       MM   ,M9  ,pW"Wq.  MM,dMMb.   .gP"Ya `7Mb,od8 mmMMmm  ,6"Yb.  ',
    '+    MM"""bg. 6W\'   `Wb MM         MMmmdM9  6W\'   `Wb MM    `Mb ,M\'   Yb  MM\' "\'   MM   8)   MM  ',
    '+    MM    `Y 8M     M8 MM         MM  YM.  8M     M8 MM     M8 8M""""""  MM       MM    ,pm9MM  ',
    '+    MM    ,9 YA.   ,A9 MM         MM   `Mb.YA.   ,A9 MM.   ,M9 YM.    ,  MM       MM   8M   MM  ',
    '+  .JMMmmmd9   `Ybmd9\'  `Mbmo    .JMML. .JMM.`Ybmd9\'  P^YbmdP\'   `Mbmmd\'.JMML.     `Mbmo`Moo9^Yo.',
    '+                                                                                                ',
    '+  ==============================================================================================',
    '+                                                                                                ',
    `+  - version: ${AppConst.VERSION}                                                                `,
    `+  - description: ${AppConst.DESCRIPTION}                                                        `,
    `+  - author: ${AppConst.AUTHOR}                                                                  `,
    `+  - repository: ${AppConst.REPOSITORY_URL}                                                      `,
    '```'
  ].join('\n');

  channel.send(content);
}
