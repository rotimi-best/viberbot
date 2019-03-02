const Datastore = require("nedb-promises");

const usersDb = Datastore.create({
  filename: "db/data/users.db",
  timestampData: true,
  autoload: true
});

module.exports = { usersDb };
