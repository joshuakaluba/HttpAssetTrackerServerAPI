var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    req.getConnection(function(err, conn) {

        if (err) {
            return next("Cannot Connect");
        }

        var query = conn.query('SELECT `lastTimeExecuted` FROM last_time_executed;', function(err, rows) {

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