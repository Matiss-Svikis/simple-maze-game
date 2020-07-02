(function RunMazeGame() {
	var documentsElement = document.getElementById('myCanvas');
	var context = documentsElement.getContext('2d');
	var redColor = 'red';
	var grayColor = 'gray';
	var xPosition;
	var yPosition;
	var solidBlock = 0;
	var emptySpace = 1;
	var finishLine = -2;
	var playerPos = -1;
	var keyBlock = 2;
	var playerHasKey = false;
	var maze = [
		[ 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0 ],
		[ 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
		[ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0 ],
		[ 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0 ],
		[ 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0 ],
		[ 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0 ],
		[ 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0 ],
		[ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0 ],
		[ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0 ],
		[ 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0 ],
		[ 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0 ],
		[ 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0 ],
		[ 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
		[ 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
		[ 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0 ],
		[ 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ],
		[ 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0 ],
		[ 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0 ],
		[ 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0 ],
		[ 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0 ],
		[ 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0 ],
		[ 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0 ],
		[ 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0 ],
		[ 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0 ],
		[ 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0 ],
		[ 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0 ],
		[ 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0 ],
		[ 0, 2, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
	];

	for (var y = 0; y < 600; y += 20) {
		for (var x = 0; x < 600; x += 20) {
			if (maze[y / 20][x / 20] == solidBlock) {
				Draw(x, y, '#370020');
			}

			if (maze[y / 20][x / 20] == emptySpace) {
				Draw(x, y, '#CBCBCB');
			}

			if (maze[y / 20][x / 20] == playerPos) {
				Draw(x, y, '#FE6000');
				xPosition = x / 20;
				yPosition = y / 20;
			}
			if (maze[y / 20][x / 20] == finishLine) {
				Draw(x, y, 'green');
			}
			if (maze[y / 20][x / 20] == keyBlock) {
				Draw(x, y, 'yellow');
			}
		}
	}

	function Draw(x, y, color) {
		context.fillStyle = color;
		context.fillRect(x, y, 20, 20);
	}

	window.addEventListener('keydown', (event) => {
		switch (event.key) {
			case 'ArrowUp':
				if (yPosition) {
					//So the square doesnt want to go outside of the maze
					if (maze[yPosition - 1][xPosition] == keyBlock) {
						playerHasKey = true;
					}
					if (maze[yPosition][xPosition] == playerPos && maze[yPosition - 1][xPosition] >= emptySpace) {
						maze[yPosition][xPosition] = emptySpace;
						maze[yPosition - 1][xPosition] = playerPos;
						Draw(xPosition * 20, yPosition * 20 - 20, redColor);
						Draw(xPosition * 20, yPosition * 20, grayColor);
						yPosition -= 1; // since you go up you only need to decrement the Y axis
					}
				}
				break;
			case 'ArrowDown':
				if (yPosition < 29) {
					//So the square doesnt want to go outside of the maze
					if (maze[yPosition + 1][xPosition] == keyBlock) {
						playerHasKey = true;
					}
					if (
						(maze[yPosition][xPosition] == playerPos && maze[yPosition + 1][xPosition] >= emptySpace) ||
						maze[yPosition + 1][xPosition] == finishLine
					) {
						if (maze[yPosition + 1][xPosition] == finishLine && playerHasKey) {
							alert('VIIIIIICTORIIIIY');
						}

						if (maze[yPosition + 1][xPosition] == finishLine && !playerHasKey) {
							break;
						}
						maze[yPosition][xPosition] = emptySpace;
						maze[yPosition + 1][xPosition] = playerPos;
						Draw(xPosition * 20, yPosition * 20 + 20, redColor);
						Draw(xPosition * 20, yPosition * 20, grayColor);
						yPosition += 1; // since you go down you only need to increment the Y axis
					}
				}
				break;
			case 'ArrowLeft':
				if (xPosition) {
					//So the square doesnt want to go outside of the maze
					if (maze[yPosition][xPosition - 1] == keyBlock) {
						playerHasKey = true;
					}
					if (maze[yPosition][xPosition] == playerPos && maze[yPosition][xPosition - 1] >= emptySpace) {
						maze[yPosition][xPosition] = emptySpace;
						maze[yPosition][xPosition - 1] = playerPos;
						Draw(xPosition * 20 - 20, yPosition * 20, redColor);
						Draw(xPosition * 20, yPosition * 20, grayColor);
						xPosition--; //Since you go left you only need to decrement the X axis
					}
				}
				break;
			case 'ArrowRight':
				if (xPosition < 29) {
					//So the square doesnt want to go outside of the maze
					if (maze[yPosition][xPosition + 1] == keyBlock) {
						playerHasKey = true;
					}
					if (maze[yPosition][xPosition] == playerPos && maze[yPosition][xPosition + 1] >= emptySpace) {
						maze[yPosition][xPosition] = emptySpace;
						maze[yPosition][xPosition + 1] = playerPos;
						Draw(xPosition * 20 + 20, yPosition * 20, redColor);
						Draw(xPosition * 20, yPosition * 20, grayColor);
						xPosition++; //Since you go right you only need to increment the X axis
					}
				}
				break;
		}
	});
})();
