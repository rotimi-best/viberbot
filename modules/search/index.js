const phoneChecker = require('libphonenumber-js');

const { QUESTION_KEY } = require("../../helpers/constants");

const checkIfDivisibleByTwo = number => number % 2 === 0;

const generateKeyboard = BUTTONS => {
  const keyboard = [];

  let texts = [];

  for (const BUTTON of BUTTONS) {
    if (checkIfDivisibleByTwo(texts.length + 1)) {
      texts.push({ text: BUTTON });
      keyboard.push(texts);

      texts = [];
    } else {
      texts.push({ text: BUTTON });

      if (BUTTONS.indexOf(BUTTON) === BUTTONS.length - 1) {
        keyboard.push(texts);
        texts = [];
      }
    }
  }
  return keyboard;
};

const askGeneralQuestion = async ($, question) => {
  return new Promise(res => {
    const { QUESTION, BUTTONS, ERROR, CATEGORY, KEY } = question;

    const keyboard = generateKeyboard(BUTTONS);

    const form = {
      [CATEGORY]: {
        q: QUESTION,
        error: ERROR,
        resize_keyboard: true,
        keyboard,
        validator: (message, callback) => {
          const reply = message.text;
          const vinTest = /[a-z A-Z 0-9]/g.test(reply);
          
          // VIN number validation
          if (KEY === QUESTION_KEY.VIN) {
            if (reply.length === 17 && vinTest) {
              callback(true, reply);
              return;
            }
          } else if (KEY === QUESTION_KEY.PHONE) {
            const phoneTest = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(reply)
            if (phoneTest){
              callback(true, reply);

              return;
            }
          } else if(reply.length) {
            callback(true, reply);
            return;
          }

          callback(false);
        }
      }
    };

    $.runForm(form, result => {
      res(result);
    });
  });
};

module.exports = {
  askGeneralQuestion
};
