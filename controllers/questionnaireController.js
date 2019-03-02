require("dotenv").config();
const Telegram = require("telegram-node-bot");
const TelegramBaseController = Telegram.TelegramBaseController;
const {
  sendToAdmin,
  askGeneralQuestion,
  replyAndRemoveKeyboard
} = require("../modules");
const { addLeads, addCompanies, addContacts, addNotes } = require('../modules/amocrm');
const { addUser, getUser } = require('../db/methods/users');

const { QUESTIONS } = require("../helpers/constants");

class QuestionnaireController extends TelegramBaseController {
  /**
   * Ask questions about car
   * @param {Scope} $ Scope of the message
   */
  async questionsHandler($) {
    const telegramId = $.message.chat.id;
    const userName = $.message.chat.firstName || $.message.chat.lastName;

    const oldUser = await getUser({ telegramId });

    if (oldUser.length) {
      // What to say if the person types /start again
      // What to say when a who user who has used the bot before sends a message again
      replyAndRemoveKeyboard($, 'Вы можете задать вопрос и менеджер ответит на вопрос');

      return;
    }

    let answerReview = "Отлично. Данные заявки:";
    const answers = [];
    for (const QA of QUESTIONS) {
      const choosenAnswer = await askGeneralQuestion($, QA);

      for (const category in choosenAnswer) {
        if (choosenAnswer.hasOwnProperty(category)) {
          const answer = choosenAnswer[category];

          answers.push(answer);

          answerReview += `\n${category}: ${answer}`;
        }
      }
    }

    answerReview += '\n\nЗаявка отправлена, мы как можно быстрее её обработаем и свяжемся с вами.';

    console.log(answers);

    replyAndRemoveKeyboard($, answerReview);

    await this.pushToCrm(answers, telegramId);

    sendToAdmin(`User: ${userName},  just made a search - ${telegramId}`);
  }

  async pushToCrm(answers, telegramId) {
    const [vinNumber, details, leadName, phoneNumber, urgency] = answers;

    const leads = [{
      name : `${leadName} (из бота)`
    }];

    const leadRes = await addLeads(leads);
    
    if (leadRes.length) {
      const [{ id: leadId }] = leadRes;

      await addUser({ leadId, telegramId, answers });

      const companies = [{
        name: vinNumber,
        linked_leads_id:[ leadId ],
      }];

      const companyRes = await addCompanies(companies);

      if (companyRes.length) {
        const [{ id: companyId }] = companyRes;

        const contacts = [{
          name: leadName,
          linked_leads_id:[ leadId ],
          linked_company_id:[ companyId ],
          company_name: vinNumber,
          custom_fields: [{
            id: 16743,
            name: 'Phone',
            code: 'PHONE',
            values: [{ value: phoneNumber, enum: '26615' }]
          }]
        }];

        await addContacts(contacts);

        const notes = [{ 
          element_id: leadId,
          element_type: "2",
          text: `Детали: ${details}\nСрочность: ${urgency}`,
          note_type: "4"
        }];

        await addNotes(notes);
      }
    }
  }

  get routes() {
    return {
      questionsCommand: "questionsHandler"
    };
  }
}

module.exports = QuestionnaireController;
