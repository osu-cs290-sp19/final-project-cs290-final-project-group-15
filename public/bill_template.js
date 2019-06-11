(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bill_template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- Bill templete -->\n\n  <article class=\"bill\">\n    <div class=\"bill-icon\">\n      <i class=\"fas fa-file-invoice-dollar\"></i>\n    </div>\n    <div class=\"bill-content\">\n      <p class=\"bill-text\">\n        "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n      </p>\n      <p class=\"bill-author\">\n        <a href=\"#\">"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</a>\n      </p>\n    </div>\n  </article>\n";
},"useData":true});
})();