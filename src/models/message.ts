export default class Message {
  welcomeMessage: string 
  
  constructor() {
    this.welcomeMessage = `
        Welcome to 将棋 app!
        Ready to start?
    `
  }
  
  returnMessage(situation: string): string {
    switch (situation) {
      case 'welcome':
        return this.welcomeMessage;
      default:
        return 'no message';
    }
  }
}