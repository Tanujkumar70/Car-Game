document.addEventListener('keydown', function(event) {
    const car = document.getElementById('car');
    const carLeft = parseInt(window.getComputedStyle(car).getPropertyValue('left'));

    if (event.key === 'ArrowLeft' && carLeft > 0) {
        car.style.left = carLeft - 10 + 'px';
    } else if (event.key === 'ArrowRight' && carLeft < 250) {
        car.style.left = carLeft + 10 + 'px';
    }
});

function createObstacle() {
    const road = document.querySelector('.road');
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.floor(Math.random() * 250) + 'px';
    road.appendChild(obstacle);

    let obstacleInterval = setInterval(() => {
        const obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        obstacle.style.top = obstacleTop + 5 + 'px';

        if (obstacleTop > 600) {
            clearInterval(obstacleInterval);
            road.removeChild(obstacle);
        }

        const car = document.getElementById('car');
        const carLeft = parseInt(window.getComputedStyle(car).getPropertyValue('left'));
        const carTop = parseInt(window.getComputedStyle(car).getPropertyValue('top'));
        const carRight = carLeft + 50;
        const carBottom = carTop + 100;

        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        const obstacleRight = obstacleLeft + 50;
        const obstacleBottom = obstacleTop + 100;

        if (
            carRight > obstacleLeft &&
            carLeft < obstacleRight &&
            carBottom > obstacleTop &&
            carTop < obstacleBottom
        ) {
            alert('Game Over!');
            clearInterval(obstacleInterval);
            window.location.reload();
        }
    }, 20);
}

setInterval(createObstacle, 2000);