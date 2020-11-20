const express = require("express");
const exhbs = require("express-handlebars");
const products = require("./products.json");

const app = express();

//говорит серверу что он может отдавать файлы из папки public
//например так http://localhost:4444/images/magic.gif
app.use(express.static("public"));

//Sets our app to use the handlebars engine
//говорим что для шаблонов хотим использовать handlebars
app.set("view engine", "hbs");

//Sets handlebars configurations (we will go through them later on)
//можно передать настройки для handlebars
//настроили расширение файла
app.engine(
  "hbs",
  exhbs({
    extname: "hbs",
  })
);

//главная http://localhost:4444/
app.get("/", (req, res) => {
  //   console.log("это колбек для /", req.url);
  //   res.send({ name: "Ivan" }); //возвращаем назад обьект

  //берет из папки layout main.hbs и встраивает в него шаблон из home
  res.render("home", { cssFileName: "home", pageTitle: "Главная" });
});

// страница http://localhost:4444/about
app.get("/about", (req, res) => {
  //   console.log("это колбек для /about", req.url);
  //   res.send("<H1>Hi this is /about</H1>"); //строка встраиваеться в html

  res.render("about", { cssFileName: "about", pageTitle: "О нас" });
});

app.get("/products", (req, res) => {
  //передаем обьект со свойством products в котором лежит массив объектов
  res.render("products", {
    products,
    cssFileName: "products",
    pageTitle: "Наши товары",
  });
});

app.get("/product/:productId", (req, res) => {
  const product = products.find((p) => p.id === req.params.productId);
  res.render("product", { product });
});

//запустили сервер на 4444 порту
app.listen(4444, () => {
  console.log(`app server is running on port ${4444}`);
});
