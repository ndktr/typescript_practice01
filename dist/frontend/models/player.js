export default class Player {
    name;
    playFirst;
    constructor(name, playFirst) {
        this.name = name;
        this.playFirst = playFirst;
    }
    getName() {
        return this.name;
    }
}
