/// <reference path="../../libs/tsd.d.ts" />
/// <reference path="../../utils/IAppRootScope.ts" />
/// <reference path="../../app/AppConstant.ts" />
/// <reference path="Checkbox.ts" />
/**
 * @module Core
 */

module Core {
	/**
	 * @module UI
	 */
	export module UI {

		export interface ICheckboxScope extends ICheckbox{
			
		}

		/**
		 * Директива для кастомизации чекбокса
		 * @class Checkbox
		 * @directive checkbox
		 */
		export function CheckboxDirective(ConfigStorageService: Core.Config.ConfigStorageService): any {
			return {
				restrict: 'EA',
				replace: 'true',
				templateUrl: ConfigStorageService.getConfig().getContentURL() + '/checkbox/checkbox.html',
				require: '^ngModel',
				scope: {
					model: '=ngModel',
					label: '=',
					name: '@',
					onChange: '=?ngChange',
					disabled: '=?ngDisabled',
					indeterminate: '='
				},
				link: (scope: ICheckboxScope, element: JQuery, attrs: any, ngCtrl: any): void => {
					if (attrs.indeterminate){						
						element.find('input').prop('indeterminate', ()=>{
							let indeterminate = scope.indeterminate;
							return indeterminate && indeterminate.displayed > 0 && indeterminate.displayed < indeterminate.total
						});
					}
				}
			};
		}
	}
}
angular.module(Core.App.AppConstant.ANGULAR_MODULE_NAME).directive('checkbox',  ['ConfigStorageService', Core.UI.CheckboxDirective]);
