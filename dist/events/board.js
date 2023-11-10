export const handleClick = (event) => {
    if (event.target.tagName.toLowerCase() === 'span') {
        const playerNumber = event.target.classList[0].replace('player', '');
        console.log(`Player ${playerNumber}がクリックされました`);
    }
};
