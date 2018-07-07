app.factory("luxuryCultureService", luxuryCultureService);
luxuryCultureService.$inject = ["$http", "$window"];

function luxuryCultureService($http, $window) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

    var service = {
        getLuxuryCulture: getLuxuryCulture,
        deleteLuxuryCulture: deleteLuxuryCulture,
        createLuxuryCulture: createLuxuryCulture,
        editLuxuryCulture: editLuxuryCulture,
    };

    return service;

    function getLuxuryCulture(id, token, host) {
        return $http.get(host + "dashboard/viewset/luxury_culture/", {
            params: {
                "id": id,
                "token": token
            }
        });
    }

    function deleteLuxuryCulture(id, token, host) {
        return $http.delete(host + "dashboard/viewset/luxury_culture/" + id + "/", {
            params: {
                "token": token
            }
        });
    }

    function createLuxuryCulture(newLuxuryCulture, file , token, host) {
        var fd = new FormData();
        newLuxuryCulture.token = token
        if (file != null || file != undefined) fd.append("file", file);
        fd.append("newLuxuryCulture", angular.toJson(newLuxuryCulture));
        return $http.post(host + "dashboard/viewset/luxury_culture/", fd, {
            headers: {
                "Content-Type": undefined
            }
        });
    }

    function editLuxuryCulture(id, luxuryCulture, file, token, host) {
        var fd = new FormData();
        luxuryCulture.token = token
        if (file != null || file != undefined) fd.append("file", file);
        fd.append("editluxuryCulture", angular.toJson(luxuryCulture));
        return $http.put(host + "dashboard/viewset/luxury_culture/" + id + "/", fd, {
            headers: {
                "Content-Type": undefined
            }
        });
    }
}
