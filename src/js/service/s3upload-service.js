app.service('S3UploadService', ['$q', function ($q) {
    // Us standard region
    AWS.config.region = 'us-west-1';
    AWS.config.update({
        accessKeyId: 'AKIAIWOBBXZSFCPTTLUQ',
        secretAccessKey: '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'
    });

    var bucket = new AWS.S3({
        params: {
            Bucket: 'mytemptbucket',
            maxRetries: 1
        },
        httpOptions: {
            timeout: 360000
        }
    });

    this.Progress = 0;
    this.Upload = function (file) {
        var deferred = $q.defer();
        var str = file.type;
        var res = str.split("/");
        var d = new Date();
        var month = d.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var day = d.getDate();
        if (day < 10) day = "0" + day;
        var params = {
            Bucket: 'mytemptbucket/uploads/' + d.getFullYear() + '/' + month + '/' + day,
            Key: (uuidv4() + "." + res[1]),
            ContentType: file.type,
            Body: file
        };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'bucket-owner-full-control'
        };
        var uploader = bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            //when success pass back the data to frontend
            deferred.resolve(data["Location"]);
        });

        uploader.on('httpUploadProgress', function (event) {
            deferred.notify(event);
        });

        return deferred.promise;
    };

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}]);