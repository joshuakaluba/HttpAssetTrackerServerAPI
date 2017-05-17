var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

    req.getConnection(function(err, conn) {

        if (err) {
            return next("Cannot Connect");
        }

        var query = conn.query('SELECT `url`,`dateCreated` FROM monitoredsite limit 0,200;', function(err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error");
            }

            res.status(200);

            res.send(rows);

        });

    });


});


router.post('/', function(req, res, next) {

    req.assert('url', 'please provide a valid url').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    var data = {
        url: req.body.url
    };

    req.getConnection(function(err, conn) {

        if (err) {
            return next("Cannot Connect");
        }

        var query = conn.query("INSERT INTO monitoredsite set ? ", data, function(err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error");
            }

            res.sendStatus(200);

        });

    });

});


router.put('/', function(req, res, next) {

    var id = req.body.id;

    req.assert('id', 'id is required').notEmpty();
    req.assert('url', 'url is required').notEmpty();
    req.assert('active', 'active state is required').notEmpty();
    req.assert('dateCreated', 'dateCreated is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(422).json(errors);
        return;
    }

    var data = {
        url: req.body.url,
        active: req.body.active,
        dateCreated: req.body.dateCreated
    };


    req.getConnection(function(err, conn) {

        if (err) {
            return next("Cannot Connect");
        }

        var query = conn.query("UPDATE monitoredsite set ? WHERE id = ? ", [data, id], function(err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error");
            }

            res.sendStatus(200);

        });

    });

});


module.exports = router;