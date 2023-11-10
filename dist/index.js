import Game from './controllers/game.js';
const shogi = new Game();
shogi.welcome();
// ゲーム開始時
// 1. 先行プレイヤーの手番にする
// 2. 駒を選択する
// 3. 駒の移動先を選択する
// 4. 駒を移動する
// 5. 盤面を更新する
// 6. 次のプレイヤーの手番にする
// 7. 2に戻る
