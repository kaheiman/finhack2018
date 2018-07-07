app.factory('contentCreateService', contentCreateService);
contentCreateService.$inject = ['$http', '$window'];

function contentCreateService($http, $window) {

    var service = {
        createContent: createContent,
        createContentTranslate: createContentTranslate
    };
    return service;

    function createContent(luxuryCulture, tips, dailyChallengeQuiz, dailyChallenge, knowledge, knowledgeCards, knowledgeQuizzes, config, file, token, host) {
        var fd = new FormData();

        if (config.type == 'knowledge') {
            fd.append("knowledge", angular.toJson(knowledge));
            fd.append("knowledgeCards", angular.toJson(knowledgeCards));
            fd.append("knowledgeQuizzes", angular.toJson(knowledgeQuizzes));
        }
        if (config.type == 'culture') {
            if (file != null || file != undefined) fd.append("file", file);
            fd.append("luxuryCulture", angular.toJson(luxuryCulture));
        }
        if (config.link) {
            fd.append("tipsOfTheDay", angular.toJson(tips));
            fd.append("dailyChallengeQuiz", angular.toJson(dailyChallengeQuiz));
            fd.append("dailyChallenge", angular.toJson(dailyChallenge));
        }
        fd.append("withTipsAndDc", config.link);
        fd.append("token", token);
        fd.append("memsourceProjectOption", angular.toJson(config.memsourceProjectOption));
        fd.append("type", config.type);
        return $http.post(host + 'dashboard/content_create/', fd, {
            headers: {
                'Content-Type': undefined
            }
        });
    }

    function createContentTranslate(data, token, host) {
        data.token = token;
        return $http.post(host + 'dashboard/content_create_translate/', data);
    }

}