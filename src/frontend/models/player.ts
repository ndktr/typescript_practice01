export default class Player {
  name: string
  playFirst: boolean

  constructor(name: string, playFirst: boolean) {
    this.name = name
    this.playFirst = playFirst
  }

  getName(): string {
    return this.name
  }
}