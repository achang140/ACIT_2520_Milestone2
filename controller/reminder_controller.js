let database = require("../database");

let remindersController = {
  list: (req, res) => {
    let username = req.user.id;
    res.render("reminder/index", { reminders: database[username].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let username = req.user.id;
    let reminderToFind = req.params.id;
    let searchResult = database[username].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[username].reminders });
    }
  },

  create: (req, res) => {
    let username = req.user.id;
    let reminder = {
      id: database[username].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[username].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let username = req.user.id 
    let reminderToFind = req.params.id;
    let searchResult = database[username].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let username = req.user.id;
    let reminderToFind = req.params.id;

    for (i = 0; i < database[username].reminders.length; i++) {
      if (database[username].reminders[i].id == reminderToFind) {
        database[username].reminders[i].title = req.body.title;
        database[username].reminders[i].description = req.body.description; 
        if (req.body.completed == "true") { 
          database[username].reminders[i].completed = true; 
        } else {
          database[username].reminders[i].completed = false; 
        }
      }
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let username = req.user.id 
    let reminderToFind = req.params.id;
    
    for (i = 0; i < database[username].reminders.length; i++) {
      if (database[username].reminders[i].id == reminderToFind) {
        database[username].reminders.splice(i, 1) 
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
