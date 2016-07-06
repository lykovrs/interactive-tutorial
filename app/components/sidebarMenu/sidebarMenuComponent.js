
// Компонент бокового меню
angular.module('sidebarMenu', []);
labApp.directive("sidebarMenu", function($compile) {
    return {
        restrict: "E",
        scope: {items: '='},
        template: `
         <ul>         
            <li ng-repeat="item in items">
                {{item.title}}
                <sidebar-menu items="item.items"></sidebar-menu>
            </li>
        </ul>
        `
       ,
        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                    iElement.append(clone);
                });
            };
        }
    };
});