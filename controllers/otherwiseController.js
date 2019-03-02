const { TelegramBaseController } = require("telegram-node-bot");
const CONSTANTS = require("../helpers/constants");
const { sendToAdmin, replyAndRemoveKeyboard } = require("../modules");

class OtherwiseController extends TelegramBaseController {
  async handle($) {
    const msg = $.message.text;
    const userName = $.message.chat.firstName || $.message.chat.lastName;

    replyAndRemoveKeyboard($, CONSTANTS.GET_BACK_TO_YOU);

    sendToAdmin(
      `A user: ${userName} sent this to the bot ${msg || "Sticker or emoji"}`
    );
  }
}

module.exports = OtherwiseController;
