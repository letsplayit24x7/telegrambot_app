// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';
const server = "https://telegrambot-demo.vercel.app"
// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            // const { chat: { id }, text } = body.message;
            const { message_id, from: { username }, chat: { id }, text } = body.message;

            if (text && text.startsWith('c2VjcmV0')) {
                let msg = text + "!!!" + username.toLowerCase();
                let reqUrl = `${server}/${msg}`
                axios.get(reqUrl)
                    .then(response => {
                        const message = response;
                        // Send our new message back in Markdown
                        // console.log(response.substr(0,20));
                        bot.sendMessage(id, message, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                        // console.log(response.data.url);
                        // console.log(response.data.explanation);
                    })
                    .catch(error => {
                        console.log(error);
                        bot.sendMessage(id, error, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                    });

                // Create a message to send back
                // We can use Markdown inside this

            }

        }
    }
    catch (error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }

    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};