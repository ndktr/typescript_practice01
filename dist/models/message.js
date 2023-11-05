export default class Message {
    welcomeMessage;
    constructor() {
        this.welcomeMessage = `
        Welcome to 将棋 app!
        Ready to start?
    `;
    }
    returnMessage(situation) {
        switch (situation) {
            case 'welcome':
                return this.welcomeMessage;
            default:
                return 'no message';
        }
    }
}
