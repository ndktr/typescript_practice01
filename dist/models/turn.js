export default class Turn {
    currentTurn;
    constructor() {
        this.currentTurn = 1;
    }
    changeTurn() {
        const currentTurn = this.currentTurn;
        this.currentTurn = currentTurn == 1 ? 2 : 1;
    }
    getCurrent() {
        return this.currentTurn;
    }
}
