tutorialApp.component('result', {
    templateUrl: 'result.html',
    controller: function (questionsService) {
        this.result = questionsService.getResult();

        this.myJson = {
            type: 'pie',
            tooltip: {
                text: "Колличество ответов: %v"
            },
            legend: {
                layout: "x5",
                position: "50%",
                borderColor: "transparent",
                marker: {
                    borderRadius: 10,
                    borderColor: "transparent"
                }
            },
            series: [

                {
                    text: 'Верные ответы',
                    values: [this.result.rightAswers]
                },
                {
                    text: 'Ответы с ошибкой',
                    values: [this.result.notRightAswers]
                }
            ]
        };
    }
});
