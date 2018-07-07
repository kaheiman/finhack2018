app.factory("commonService", commonService);
commonService.$inject = ["$http", "$window"];

function commonService($http, $window) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

    var service = {
        getUserPermission: getUserPermission,
        authLogin: authLogin,
        authLogout: authLogout,
        getProductGroup: getProductGroup,
        getUserGroup: getUserGroup,
        getStreamGroup: getStreamGroup,
        getLanguage: getLanguage,
        checkAuth: checkAuth
    };
    return service;

    function getUserPermission(token, host) {
        return $http.get(host + "dashboard/getUserPermission/", {
            params: {
                "token": token,
            },
        });
    }

    function authLogin(data, host) {
        return $http.post(host + "dashboard/authLogin/", data);
    }

    function checkAuth(token, host) {
        var data = {
            "token": token
        }
        return $http.post(host + "dashboard/checkAuth/", data);
    }

    function authLogout(token, host) {
        var data = {
            "token": token
        };
        return $http.post(host + "dashboard/authLogout/", data);
    }

    function getProductGroup(token, host) {
        return $http.get(host + "dashboard/viewset/product_group/", {
            params: {
                "token": token
            }
        });
    }

    function getUserGroup(token, host) {
        return $http.get(host + "dashboard/viewset/user_group/", {
            params: {
                "token": token
            }
        });
    }

    function getStreamGroup(token, host) {
        return $http.get(host + "dashboard/viewset/stream_group/", {
            params: {
                "token": token
            }
        });
    }

    function getLanguage(token, host) {
        return $http.get(host + "dashboard/viewset/app_language/", {
            params: {
                "token": token
            }
        });
    }
}
