require("dotenv").config();
const { askGeneralQuestion } = require("./search");
const Bot = require("../helpers/botConnection");
const bot = Bot.get();

/**
 * Get the length of a String or Array
 * @param {Any} x Value to get the length of
 */
const len = x => x.length;

/**
 * Generate a random number from a range of 2 numbers
 * @param {Number} min The minimum number for the random number
 * @param {Number} max The maximum number for the random number
 */
const genRandNum = (min, max) =>
  Math.floor(Math.random() * (1 + max - min)) + min;

/**
 * @param {Object} params This should be an Object with fields you need in order to manipulate the date.
 * Currently there are 2 fields used which is: `monthInText` and `dayInText`
 * `monthInText`: if true then the name of the month will be returned instead of its index
 * e.g 2018-Nov-02 not 2018-12-02
 */
const date = params => {
  const today = new Date();
  const daysInTextArr = CONSTANTS.DAYS.LONG;
  const { monthInText, dayInText } = params || false;
  const day = today.getDate();
  const dayText = today.getDay();
  const month = monthInText ? today.getMonth() : today.getMonth() + 1;
  const year = today.getFullYear();
  const monthArr = CONSTANTS.MONTHS.SHORT;

  let returnVal;

  if (dayInText) return daysInTextArr[dayText];

  if (monthInText) {
    returnVal = `${year}-${monthArr[month]}-${day < 10 ? "0" + day : day}`;
  } else {
    returnVal = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }

  return returnVal;
};

/**
 * Get the current time
 * @param {Number} value A number either to add or subtract from the hours in a day
 * @param {String} arithmeticOption This would be either "+" or "-". It determines if we want to add or subtract from time
 */
const time = (value, arithmeticOption) => {
  const today = new Date();
  let seconds = today.getSeconds();
  let minutes = today.getMinutes();
  let hour = today.getHours();

  if (value) {
    if (arithmeticOption === "+") {
      hour = today.getHours() + value;

      if (hour === 24) {
        hour = 0;
      } else if (hour > 24) {
        hour = hour - 24;
      }
    } else {
      if (hour < value) {
        let midnight = value - hour;
        if (midnight === 0) hour = 0;
        else hour = 24 - midnight;
      } else {
        hour = today.getHours() - value;
      }
    }
  }

  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;
  if (hour < 10) hour = "0" + hour;

  let returnVal = hour + ":" + minutes + ":" + seconds;
  return returnVal;
};

/**
 * Send message to admin
 * @param {String} msg Message to send to admin
 */
const sendToAdmin = msg => {
  bot.api.sendMessage(process.env.ADMIN, "*BOT-FEEDBACK: *" + msg, {
    parse_mode: "Markdown"
  });
};

const replyAndRemoveKeyboard = ($, message) => {
  $.sendMessage(message, {
    reply_markup: JSON.stringify({
      remove_keyboard: true
    })
  });
};

module.exports = {
  len,
  date,
  time,
  sendToAdmin,
  askGeneralQuestion,
  replyAndRemoveKeyboard
};
