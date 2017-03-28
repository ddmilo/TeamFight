var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post')
var authHelpers = require('../helpers/auth.js')

//======================
// CREATE
//======================
//create a POST "/" route that saves the list item to the logged in user
router.post("/", function(req, res) {
	User.findById(req.params.userId)
		.exec(function(err, user) {
			if (err) { console.log(err); }
			var newList = new List({
				name: req.body.name,
				completed: req.body.completed
			});
			newList.save();
			user.list.push(newList);
			user.save();
			res.redirect(`/users/${req.params.userId}`)
		});
});

//======================
// EDIT
//======================
//create a GET "/:id/edit" route that renders the list's edit page
router.get("/:id/edit", function(req, res) {
	List.findById(req.params.id)
		.exec(function(err, list) {
			if (err) { console.log(err); }
			res.render("lists/edit", {
				list: list,
				user: req.params.userId
			});
		});
});

//======================
// UPDATE
//======================
//create a PUT "/:id" route that saves the changes from the list.
router.put("/:id", function(req, res) {
	List.findById(req.params.id)
		.exec(function(err, list) {
			if (err) { console.log(err); }
			list.name = req.body.name;
			list.completed = req.body.completed;
			list.save();
		});
	User.findById(req.params.userId)
		.exec(function(err, user) {
			if (err) { console.log(err); }
			var listToEdit = user.list.id(req.params.id);
			listToEdit.name = req.body.name;
			listToEdit.completed = req.body.completed;
			user.save();
			res.redirect(`/users/${req.params.userId}`);
		});
});

//======================
// DELETE
//======================
//create a DELETE "/:id" route that deletes the list item
router.delete("/:id", function(req, res) {
	User.findByIdAndUpdate(req.params.userId, {
		$pull: {
			list: {_id: req.params.id}
		}
	})
		.exec(function(err, user) {
			if (err) { console.log(err); }
		});
	List.findByIdAndRemove(req.params.id)
		.exec(function(err, list) {
			if (err) { console.log(err); }
			res.redirect(`/users/${req.params.userId}`);
		});
});

//======================
// EXPORTS
//======================
module.exports = router;
