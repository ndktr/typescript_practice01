export const handleClick = (event) => {
    if (event.target.tagName.toLowerCase() === 'span') {
        const playerNumber = event.target.classList[0].replace('player', '');
        // ここにクリックされたspanに対する処理を書く
        console.log(`Player ${playerNumber}がクリックされました`);
    }
};
