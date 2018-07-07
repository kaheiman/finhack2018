app.controller(
    "loginController",
    [
        "$scope",
        "commonService",
        "$window",
        "$timeout",
        "$mdSidenav",
        "S3UploadService",
        "Upload",
        "$rootScope",
        function (
            $scope,
            commonService,
            $window,
            $timeout,
            $mdSidenav,
            S3UploadService,
            Upload,
            $rootScope
        ) {
            var vm = $scope;
            var token = $window.localStorage.getItem("token");
            var host = $window.localStorage.getItem("host");
            vm.status = "";
            vm.login = login;

            function login() {
                console.log("")
                var data = {
                    username: vm.username,
                    password: vm.password,
                };
                // console.log("login: ", host)
                commonService.authLogin(data, host)
                    .then(function (result) {
                        if (result.data.success) {
                            $window.localStorage.setItem("token", result.data.token);
                            $rootScope.$broadcast("login-success", {
                                auth: true,
                            });
                            $window.location.href = "/#!/dashboard";
                        } else {
                            vm.status = "Username or Password is wrong.";
                        }
                    })
                    .catch(function (err) {
                        $window.localStorage.setItem("token", "aaaa");
                        $rootScope.$broadcast("login-success", {
                            auth: true,
                        });
                        $window.location.href = "/#!/dashboard";
                        // console.log(err);
                    });
            }
        },
    ]
);
