export default class Turn {
  private currentTurn: number;

  constructor() {
    this.currentTurn = 1;
  }
  
  public changeTurn(): void {
    const currentTurn: number = this.currentTurn;
    this.currentTurn = currentTurn == 1 ? 2 : 1 ;
  }

  public getCurrent(): number {
    return this.currentTurn;
  }


}