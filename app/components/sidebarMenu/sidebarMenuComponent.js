
// Компонент бокового меню
angular.module('sidebarMenu', []);
labApp.component("sidebarMenu", {
        restrict: "E",
        bindings: {
            items: '='
        },
        templateUrl: 'components/sidebarMenu/sidebarMenu.html'
        ,
        controller: function () {
            console.log(this.items )
            // this.items = [1,2,3]


        }
});