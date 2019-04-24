const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;

    var data = {
        member: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name
            }
        }]
    };

    var jsonData = JSON.stringify(data);


    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/LISTID",
        method: "POST",
        headers: {
            "Authorization": "samrat1 API KEY"
        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (error) {
            // res.sendFile(__dirname + "/failure.html");
            console.log("error--->" + error);
        } else {
            if (res.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
            // console.log("response.statusCode--->" + response.statusCode);
            // console.log("res.statusCode--->" + res.statusCode);

        }
    });
});

app.post("/failure", function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("SERVER IS RUNNING ON 4000 PORT.");
});
