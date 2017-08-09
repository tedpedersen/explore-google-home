'use strict';
var request = require('request');

exports.welcomemessage = function (req, res) {
    res.json({
        "message": "Welcome to eBay Trending API!!"
    });
};


/* Function to comparea the data */
function sortObject(a, b) {
    if (a.id > b.id)
        return -1;
    if (a.id < b.id)
        return 1;
    return 0;
}


/* Get the story data */
exports.trendingStories = function (req, res) {

    request("http://trendkw.ebay.com/kwsrv/v2/conceptKeywords?top=50&site=0", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            var data = body["results"];
            var sortdata = data.sort(sortObject);
            var today = sortdata[0]['storyCreDate'];
            /*            var date = new Date();
                        date.setDate(date.getDate() - 1);
                        var today = date.toISOString().substring(0, 10);*/
            var storyList = [];

            /* get today's trends */
            for (var i = 0; i < sortdata.length; i++) {
                if (sortdata[i].storyCreDate === today) {
                    var trndStory = {};
                    trndStory["storytitle"] = sortdata[i].storyTitle;
                    trndStory["storydate"] = sortdata[i].storyCreDate;
                    trndStory["story"] = sortdata[i].story;
                    trndStory["siteid"] = sortdata[i].siteId;
                    trndStory["imageUrl"] = sortdata[i].sqImageUrl;
                    trndStory["itemurl"] = sortdata[i].clnUrl;
                    storyList.push(trndStory);
                }
            }

            if (req.body.result.parameters.story1.length > 0 && req.body.result.parameters.story2.length == 0) {
                console.log('Hi i am in story 1', req.body.result.parameters);
                var response = storyList[0]["storytitle"] + " is trending on eBay. This is because " + storyList[0]["story"] + " Do you want to hear more? ";
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    "speech": response
                }));

            } else if (req.body.result.parameters.story2 == 'yes') {
                console.log('Hi i am in story 2', req.body.result.parameters);
                var response = storyList[1]["storytitle"] + " is trending on eBay. This is because " + storyList[1]["story"];
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    "speech": response
                }));
            } else {
                /*When random data is selected */
                var response = "Sorry I am not sure what you are saying";
                res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                res.send(JSON.stringify({
                    "speech": response
                }));
            }
        }
    });
};
