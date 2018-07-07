var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'textAngular', 'ngFileUpload', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.router']);
app.config(function ($httpProvider, $mdDateLocaleProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
});

app.config(function ($provide) {
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating

        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
            ['html', 'insertImage', 'insertLink', 'wordcount', 'charcount']
            // ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol',
            //     'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent',
            //     'html'
            // ]
        ];

        return taOptions;
    }]);
});
app.config(function ($mdIconProvider) {
    $mdIconProvider.iconSet('device', '../../img/favicon.png', 24);
})

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');

  })

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //table 
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: './dashboard.html',
            controller: 'dashboardController',
            controllerAs: 'vm'
        })
        .state('luxuryCulture', {
            url: '/luxuryCulture',
            templateUrl: './templates/tables/luxuryCulture.html',
            controller: 'luxuryCultureController',
            controllerAs: 'vm'
        })
        .state('knowledge', {
            url: '/knowledge',
            templateUrl: './templates/tables/knowledge.html',
            controller: 'knowledgeController',
            controllerAs: 'vm'
        })
        .state('knowledgeQuiz', {
            url: '/knowledgeQuiz',
            templateUrl: './templates/tables/knowledgeQuiz.html',
            controller: 'knowledgeQuizController',
            controllerAs: 'vm'
        })
        .state('dailyChallenge', {
            url: '/dailyChallenge',
            templateUrl: './templates/tables/dailyChallenge.html',
            controller: 'dailyChallengeController',
            controllerAs: 'vm'
        })
        .state('dailyChallengeQuiz', {
            url: '/dailyChallengeQuiz',
            templateUrl: './templates/tables/dailyChallengeQuiz.html',
            controller: 'dailyChallengeQuizController',
            controllerAs: 'vm'
        })
        .state('tipsOfTheDay', {
            url: '/tipsOfTheDay',
            templateUrl: './templates/tables/tipsOfTheDay.html',
            controller: 'tipsController',
            controllerAs: 'vm'
        })
        .state('calendar', {
            url: '/calendar',
            templateUrl: './calendar.html',
            controller: 'calendarController',
            controllerAs: 'vm'
        });

    //create
    $stateProvider
        .state('contentCreateLc', {
            url: '/contentCreateLc',
            templateUrl: './contentCreateLc.html',
            controller: 'contentCreateController',
            controllerAs: 'vm'
        })
        .state('contentCreateK', {
            url: '/contentCreateK',
            templateUrl: './contentCreateK.html',
            controller: 'contentCreateController',
            controllerAs: 'vm'
        })
        .state('dailyChallenge_create', {
            url: '/dailyChallenge_create',
            templateUrl: './templates/create/dailyChallengeCreate.html',
            controller: 'dailyChallengeController',
            controllerAs: 'vm'
        })
        .state('knowledge_create', {
            url: '/knowledge_create',
            templateUrl: './templates/create/knowledgeCreate.html',
            controller: 'knowledgeController',
            controllerAs: 'vm'
        })
        .state('knowledgeQuiz_create', {
            url: '/knowledgeQuiz_create',
            templateUrl: './templates/create/knowledgeQuizCreate.html',
            controller: 'knowledgeQuizController',
            controllerAs: 'vm'
        })
        .state('luxuryCulture_create', {
            url: '/luxuryCulture_create',
            templateUrl: './templates/create/luxuryCultureCreate.html',
            controller: 'luxuryCultureController',
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: './templates/pages/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .state("otherwise", {
            url: "*path",
            templateUrl: './dashboard.html',
            controller: 'dashboardController',
            controllerAs: 'vm'
        });

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
});

watchStateChanges.$inject = ['$rootScope', '$location', '$window', '$http'];
app.run(watchStateChanges);

function watchStateChanges($rootScope, $location, $window, $http) {
    $http.get('./env.json').then(function (data) {
        $window.localStorage.setItem("host", data.data[0]["host"]);
    });
}

app.controller('CommonCtrl', ['$scope', 'commonService', '$window', '$timeout', '$mdSidenav', 'S3UploadService', 'Upload', '$location', '$rootScope', '$mdToast',
    function ($scope, commonService, $window, $timeout, $mdSidenav, S3UploadService, Upload, $location, $rootScope, $mdToast) {
        var vm = $scope;
        var token = $window.localStorage.getItem("token");
        var host = $window.localStorage.getItem("host");
        vm.toastPosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        vm.background = '../../img/src2.png';
        vm.status = "";
        vm.imagesUrl = [];
        vm.toggleLeft = buildToggler('left');
        vm.toggleRight = buildToggler('right');
        vm.login = login;
        vm.logout = logout;
        vm.uploadFiles = uploadFiles;
        vm.insertImage = insertImage;
        vm.insertTextAtCursor = insertTextAtCursor;
        vm.hasAuth = false;
        vm.jsonUpload = {
            file: Object()
        };
        vm.closeLeft = closeLeft;
        vm.uploadContent = uploadContent;
        vm.showToast = showToast;
        // active();
        $scope.$on("login-success", function (event, args) {
            vm.hasAuth = args.auth;
        });

        function active() {
            //check token
            if (token == undefined || token == null) {
                $window.location.href = '/#!/login';
            } else {
                commonService.checkAuth(token, host)
                    .then(function (result) {
                        if (result.data.success) {
                            vm.hasAuth = true;
                        } else {
                            $window.location.href = '/#!/login';
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }

        function login() {
            var data = {
                username: vm.username,
                password: vm.password
            };
            commonService.authLogin(data)
                .then(function (result) {
                    if (result.data.success) {
                        $window.localStorage.setItem("token", result.data.token);
                        $window.location.href = '/#!/dashboard';
                    } else {
                        vm.status = "Username or Password is wrong. ";
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function logout() {
            var token = $window.localStorage.getItem("token");
            var host = $window.localStorage.getItem("host");
            commonService.authLogout(token, host)
                .then(function (result) {
                    if (result.data.success) {
                        vm.hasAuth = false;
                        $window.localStorage.removeItem("token");
                        $window.location.href = '/#!/login';
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function uploadFiles(files, gif_type) {
            var file;
            if (gif_type == true) {
                file = files;
            } else {
                vm.Files = files.compressed.dataURL;
                var blob = dataURItoBlob(vm.Files);
                file = new File([blob], 'image', {
                    type: 'image/jpg',
                    lastModified: Date.now()
                });
            }
            S3UploadService.Upload(file).then(function (result) {
                // Mark as success
                vm.imagesUrl.push(result);
                // console.log(vm.imagesUrl);
            }, function (error) {
                // Mark the error
                $scope.Error = error;
            });
        }

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], {
                type: mimeString
            });
        }

        function insertImage(url, type) {
            formatUrl = "<img src='" + url + "' style='width: 300px;'></img>";
            var temptContent = null;
            insertTextAtCursor(formatUrl);
        }

        function insertTextAtCursor(text) {
            var sel, range;
            console.log(window.getSelection());
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount && sel.anchorNode.tagName == "P") {
                    range = sel.getRangeAt(0);
                    var tag = document.createElement("p");
                    tag.style = "font-size: 16px;text-align: center;";
                    tag.innerHTML = formatUrl;
                    range.deleteContents();
                    range.insertNode(tag);
                }
            } else if (document.selection && document.selection.createRange) {
                document.selection.createRange().text = text;
            }
        }

        function closeLeft() {
            $mdSidenav('left').close();
        }

        function uploadContent() {
            languageSet = [{
                "targetLang": "zh-TW",
                "appLang": "TC"
            }, {
                "targetLang": "zh-CN",
                "appLang": "CN"
            }, {
                "targetLang": "fr",
                "appLang": "FR"
            }, {
                "targetLang": "ja",
                "appLang": "JP"
            }, {
                "targetLang": "ko",
                "appLang": "KR"
            }];
            if (vm.jsonUpload.file) {
                vm.process = true;
                showToast("File is uploading");
                var reader = new FileReader();
                reader.readAsText(vm.jsonUpload.file);
                reader.onload = function (e) {
                    var content = JSON.parse(reader.result);
                    var lang = languageSet.find(function (item, index, array) {
                        return item.targetLang == content.targetLang;
                    });
                    content.language_code = lang.appLang;
                    contentCreateService.createContentTranslate(content, token, host)
                        .then(function (msg) {
                            if (msg.data.success) {
                                vm.process = false;
                                showToast("Success");
                            } else {
                                vm.process = false;
                                showToast("ERROR");
                            }
                        }).catch(function (err) {
                            vm.process = false;
                            showToast("Some Error");
                            console.log(err);
                        });
                };
            }
        }

        function showToast(text) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .position(Object.keys(vm.toastPosition)
                    .filter(function (pos) {
                        return vm.toastPosition[pos];
                    })
                    .join(' '))
                .hideDelay(2000)
            );
        }
    }
]);
