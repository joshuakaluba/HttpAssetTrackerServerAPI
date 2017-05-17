var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    req.getConnection(function(err, conn) {

        if (err) {
            return next("Cannot Connect");
        }

        var query = conn.query('SELECT `url`,`httpResponseCode`,`dateCreated` FROM responses_not_200;', function(err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error");
            }

            res.status(200);
            res.send(rows);

        });

    });


});

module.exports = router;