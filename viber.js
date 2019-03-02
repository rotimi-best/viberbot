'use strict';
require('dotenv').config()
 
const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express')
const app = express();

const { VIBER_API_PORT, VIBER_API_KEY } = process.env;
const port = VIBER_API_PORT;

const express = require('express')
const app = express();

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const { addLeads, addCompanies, addContacts, addNotes } = require('./modules/amocrm');
const CONSTANTS = require("../helpers/constants");
const { addUser, getUser, updateUser } = require('./db/methods/users');

const { QUESTIONS } = require("./helpers/constants");

const bot = new ViberBot({
	authToken: VIBER_API_KEY,
	name: "Vce zapchasti",
	avatar: "http://viber.com/avatar.jpg"
});

bot.on(BotEvents.SUBSCRIBED, async response => {
  console.log("Subscribed");
  const viberId = response.userProfile.id;
  const viberName = response.userProfile.name;

  const [{ QUESTION }] = QUESTIONS;

  response.send(QUESTION);

  await addUser({ leadId: 0, viberId, sent: 1 });
});
    

bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
  console.log("MESSAGE_RECEIVED", message);
  
  const viberId = response.userProfile.id;
  const viberName = response.userProfile.name;
  
  const user = await getUser({ viberId });

  if (user.length) {
    const [{ sent }] = user;

    if (sent === 5) {
      const { QUESTION } = QUESTIONS[sent];
  
      response.send(QUESTION);

      await updateUser({ viberId }, { sent: sent + 1 });
    } else {
      response.send(CONSTANTS.GET_BACK_TO_YOU);
    }
  } else {
    const [{ QUESTION }] = QUESTIONS;

    response.send(QUESTION);
  
    await addUser({ leadId: 0, viberId, questions: QUESTIONS, sent: 1 });
  }
});

app.use("/viber/webhook", bot.middleware())

app.listen(port);

bot.setWebhook("https://heathered-point.glitch.me//viber/webhook");
