require('dotenv').config()
const env = process.env;

interface SlackConfig {
    enabled: boolean;
    channel: string;
    url: string;
}

const config: SlackConfig = {
    enabled: env.SLACK_ENABLED === "true",
    channel: env.SLACK_CHANNEL,
    url: env.SLACK_WEBHOOK_URL
};


export default config