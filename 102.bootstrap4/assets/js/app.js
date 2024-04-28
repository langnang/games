$(document).ready(function () {

})


Handlebars.registerPartial('layoutHeader', `
<div class="jumbotron py-4 my-3">
  <h1 class="display-4">{{title}}</h1>
  <hr class="my-2">
  <p>{{description}}</p>
</div>
`);
Handlebars.registerPartial('layoutFooter', `
<footer id="footer" class="container-fluid bg-dark">
123
</footer>
`);


const getHbs = () => { }

function renderHeader(data) {
  new Promise(resolve => resolve($.get("./assets/header.hbs")))
    .then(res => {
      var template = Handlebars.compile(res);
      $('#header').html(template(data));
    })
  // $.get("./assets/header.hbs")
  // var template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");

  // $('#header').html();
}
// const renderHeader = () => { }
function renderFooter() { }

function render(data) {
  const { title, description } = data;
  let html = $("#app").html();
  html = html.replace(/\&gt;/g, ">")
  // console.log(html);
  var template = Handlebars.compile(html);
  // execute the compiled template and print the output to the console
  // console.log(template({ doesWhat: "rocks!" }));
  $("#app").html(template({
    title: title || "Games",
    description: description || "...",
  }))
}