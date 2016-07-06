
/**
 * @module Core
 */

module Core {
    /**
     * @module UI
     */
    export module UI {
        /**
         * Компонент страницы вопросов
         * @class Questions
         * @component questions
         */
        export class QuestionsComponent {

        }
    }
}

tutorialApp.component('questions', {
    templateUrl: 'questions.html',
    controller: function (questionsService) {

        questionsService.getQuestions().then(questions => {
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        });


        this.getNextQusestion = () => {
            questionsService.getNextQusestion();
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        };

        this.getPrewQusestion = () => {
            questionsService.getPrewQusestion();
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        };

        this.endTest = () => {
            this.getNextQusestion();
            // this.result = questionsService.result;
            console.log('end');
        }
    }
});

