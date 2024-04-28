$(document).ready(function () {

})


Handlebars.registerPartial('layoutHeader', `
<div id="layout-header">
  <div class="jumbotron py-4 my-3">
    <h1 class="display-4">{{title}}</h1>
    <hr class="my-2">
    <p>{{description}}</p>
  </div>
</div>
`);
Handlebars.registerPartial('layoutFooter', `
<footer id="layout-footer" class="container-fluid text-light bg-dark">
  <div class="container">
    <div class="row row-cols-3 py-1">
      <div class="col"></div>
      <div class="col">
        <h5 class="my-1">项目依赖</h5>
        <ul class="list-unstyled my-1">
          {{#each dependencies}}
          <li><a class="text-decoration-none" href="{{this.url}}">{{this.title}}</a></li>
          {{/each}}
        </ul>
      </div>
      <div class="col">
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
  $("#app").html(template({
    title: title || "Games",
    description: description || "...",
    dependencies: dependencies || [],
    references: references || [],
  }))
}