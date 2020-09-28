const Slack = require('slack-node');
const webHookUri = require('../config/slack.json').webHookUrl;
const slack = new Slack();
slack.setWebhook(webHookUri);

exports.slackSend = async(message) => {
    slack.webhook({
        channel: "#aqoom_test_slack", // 전송될 슬랙 채널
        username: "error", //슬랙에 표시될 이름
        text: message
    }, function(err, response) {
        console.log(response);
    });
}