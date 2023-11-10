export default class Message {
  private static WELCOME: string = 'Welcome to 将棋 app!\n Ready to start?';

  getWelcome(): string {
    return Message.WELCOME;
  }
}