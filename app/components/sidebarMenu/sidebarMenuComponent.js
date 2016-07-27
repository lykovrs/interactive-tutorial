
// Компонент бокового меню
angular.module('sidebarMenu', []);
labApp.component("sidebarMenu", {
        restrict: "E",
        bindings: {
            items: '='
        },
        templateUrl: 'components/sidebarMenu/sidebarMenu.html'
        ,
        controller: function ($state) {
            console.log(this.items )
            // this.items = [1,2,3]
            this.isActive = () => {
                return $state.current.name;
            };

        }
});