import PackageJson from '~/../../package.json';

export class AppConst {
  static readonly VERSION = PackageJson.version;
  static readonly DESCRIPTION = PackageJson.description;
  static readonly AUTHOR = PackageJson.author;
  static readonly REPOSITORY_URL = 'https://github.com/ksmnvtxcviii/bot-roberta';

  static readonly CLI_CHANNEL_NAME = 'bot-roberta-cli';
  static readonly COMMAND_PREFIX = '$roberta';

  static readonly URL_REGEXP
    = /https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g;
}
