const { TextCommand } = require("telegram-node-bot");
const bot = require("./helpers/botConnection").get();

const QuestionnaireController = require("./controllers/questionnaireController");
const OtherwiseController = require("./controllers/otherwiseController");

bot.router
  .when(
    new TextCommand("/start", "questionsCommand"),
    new QuestionnaireController()
  )
  .otherwise(new OtherwiseController());
