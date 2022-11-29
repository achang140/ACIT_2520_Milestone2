let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    console.log(req.body) // 'true' 
    for (i = 0; i < database.cindy.reminders.length; i++) {
      if (database.cindy.reminders[i].id == reminderToFind) {
        database.cindy.reminders[i].title = req.body.title;
        database.cindy.reminders[i].description = req.body.description; 
        if (req.body.completed == "true") { // String 
          database.cindy.reminders[i].completed = true; 
        } else {
          database.cindy.reminders[i].completed = false; 
        }
        console.log(database.cindy.reminders[i])
      }
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    for (i = 0; i < database.cindy.reminders.length; i++) {
      if (database.cindy.reminders[i].id == reminderToFind) {
        database.cindy.reminders.splice(i, 1) // Index of the List, How Many Elements to Remove
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
