const Twit = require('twit');

const config = require('./config');

var T = new Twit(config);

var params = { 
    screen_name: 'realDonaldTrump', 
    tweet_mode: 'extended', 
    count: '2', 
    'include_rts': 'false', 
    exclude_replies: 'true'
};

T.get('statuses/user_timeline', params, function(err, data, response) {
        //console.log(data[1]);
        console.log(memeifyTweet(data[1].full_text));
        T.post('statuses/update', { status: memeifyTweet(data[1].full_text) }, function(err, data, response) {
            console.log(data);
        });

});

function memeifyTweet(originalTweet) {
    let lowerCase = true;
    let memeTweet = '';
    for (let char of originalTweet) {
        // Is a letter
        if (isLetter(char)) {
            if (lowerCase) {
                char = char.toLowerCase();
            } else {
                char =char.toUpperCase();
            }
            lowerCase = !lowerCase;
        }
        memeTweet += char;
    }
    return memeTweet;
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}