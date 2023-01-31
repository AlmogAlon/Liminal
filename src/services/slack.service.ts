
import { IncomingWebhook, IncomingWebhookResult } from '@slack/webhook';
import config from '../configs/slack.config';


async function sendMessage(message: string): Promise<IncomingWebhookResult> {
    const web = new IncomingWebhook(config.url);
    if (!config.channel || !config.enabled)
    {
        console.error(`Error while sending message to slack`, `channel is not set or feature is not enabled`);
    }
    try {
        return await web.send({ channel: config.channel, text: message });
    }
    catch (err) {
        console.error(`Error while sending message to slack`, err.message);
    }
}

export default { sendMessage };
