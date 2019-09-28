//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const loDash = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sehbaz123:helloworld@devconnector-97frp.mongodb.net/myblogDB?retryWrites=true&w=majority/myblogDB", {
  useNewUrlParser: true
});
const itemsSchema = {
  title: String,
  body: String
};
const Item = mongoose.model("Item", itemsSchema);



const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    res.render("home", {
      posts: foundItems
    });
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactData: contactContent
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    aboutData: aboutContent
  });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  const item = new Item({
    title: post.title,
    body: post.body
  });
  item.save();
  res.redirect("/");
});
app.get('/posts/:postName', function (req, res) {
  const requestedTitle = req.params.postName;
  Item.findById(requestedTitle, function (err, coolPost) {
    res.render("post", {
      postTitle: coolPost.title,
      postBody: coolPost.body
    });
  });
  console.log(requestedTitle);

});
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndDelete(checkedItemId, (err) => {
    console.log(err);
  })
  res.redirect("/");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);