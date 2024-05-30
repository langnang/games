$(document).ready(function () {

})


Handlebars.registerPartial('layoutHeader', `
<div id="layout-header" class="row">
  <div class="jumbotron col py-4 my-3">
    <h1 class="display-4">{{title}}</h1>
    <hr class="my-2">
    <p>{{description}}</p>
  </div>
</div>
`);
Handlebars.registerPartial('layoutFooter', `
<footer id="layout-footer" class="row text-light bg-dark">
  <div class="container">
    <div class="row row-cols-3 py-1">
      <div class="col text-center"></div>
      <div class="col text-center">
        <h5 class="my-1">项目依赖</h5>
        <ul class="list-unstyled my-1">
          {{#each dependencies}}
          <li><a class="text-decoration-none" href="{{this.url}}">{{this.title}}</a></li>
          {{/each}}
        </ul>
      </div>
      <div class="col text-center">
        <h5 class="my-1">参考文献</h5>
        <ul class="list-unstyled my-1">
          {{#each references}}
          <li><a class="text-decoration-none" href="{{this.url}}">{{this.title}}</a></li>
          {{/each}}
        </ul>
      </div>
    </div>
  </div>
</footer>
`);
Handlebars.registerHelper('makeArray', function (count) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }
  return arr;
});

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
  const { title, description, references, dependencies } = data;
  let html = $("#app").html();
  html = html.replace(/\&gt;/g, ">")
  // console.log(html);
  var template = Handlebars.compile(html);
  // execute the compiled template and print the output to the console
  // console.log(template({ doesWhat: "rocks!" }));

  return new Promise(resolve => resolve($("#app").html(template({
    ...data,
    title: title || "Games",
    description: description || "...",
    dependencies: dependencies || [],
    references: references || [],
  }))))
}