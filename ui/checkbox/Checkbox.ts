/// <reference path="../../libs/tsd.d.ts" />

/**
 * @module Core
 */

module Core {    
    /**
     * @module UI
     */
    export module UI {
        /**
         * Интерфейс Чекбокса
         */
        export interface ICheckbox {
            model:string; //модель
            label?:string; //метка
            name?:string; //имя
            disabled?:boolean; //заблокировано
            onChange?: () => void; //обработчик
            indeterminate?:ICheckboxIndeterminate; //состояние indeterminate
            mods?: string; //модификаторы
        }

        export interface ICheckboxIndeterminate {
            displayed: number; //текущее число
            total: number; //общее
        }

        /**
         * Чекбокс
         * @class Checkbox
         */
        export class Checkbox implements Core.UI.ICheckbox {          

            public constructor(
                public model: string,
                public label?: string,
                public name?: string,
                public disabled?: boolean,
                public onChange?: () => void,
                public indeterminate?: ICheckboxIndeterminate
            ) {
            }
        }    
    }
}

