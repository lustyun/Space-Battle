class Ship {
	constructor(hull, firepower, accuracy, name) {
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy;
		this.name = name;
	}

    // Attack the other ship
	attack(otherShip) {
		if (this.hull <= 0 || otherShip.hull <= 0) return;

		if (Math.random() < this.accuracy) {
			otherShip.hull -= this.firepower;
			console.log(
				`${this.name} hit ${otherShip.name}`,
				`Hull: ${otherShip.hull}`
			);
		} else
			console.log(
				`${this.name} missed!`,
				`${otherShip.name} Hull: ${otherShip.hull}`
			);

		if (otherShip.hull <= 0) {
			console.log(`%c${otherShip.name} ship is destoryed!`, 'color: red;');
            console.log("");
		}
	}
}

const alienShips = []; // Array to store the instances
const numberOfShips = 6; // Number of instances you want to create

// Set a defined number of alien ships with varied stats
for (let i = 0; i < numberOfShips; i++) {
	let hull = Math.floor(Math.random() * 4) + 3;
	let firepower = Math.floor(Math.random() * 3) + 2;
	let accuracy = Math.random() * 0.2 + 0.6;

	const alienShip = new Ship(
		hull,
		firepower,
		accuracy,
		getRandomAlienShipName()
	); // Create a new instance
	alienShips.push(alienShip); // Add the instance to the array
}

const USS_Assembly = new Ship(20, 5, 0.7, "USS Assembly");

let battleOver = false;

// Battle until my ship is destroyed or all enemy ships are destroyed
for (let i = 0; i < alienShips.length; i++) {
	const alienShip = alienShips[i];

	while (USS_Assembly.hull > 0 && alienShip.hull > 0) {
		USS_Assembly.attack(alienShip);
		alienShip.attack(USS_Assembly);

		if (USS_Assembly.hull <= 0) {
			console.log('%cYou Lose.', 'color: red;');
			battleOver = true;
			break;
		}
	}

	if (i === alienShips.length - 1) {
		console.log('%cYou Win.', 'color: green;');
		battleOver = true;
		break;
	}

	if (battleOver) {
		break;
	}
}

function getRandomAlienShipName() {
	const name = [
		"Zorthak",
		"Xylophor",
		"Vulcanix",
		"Quasarion",
		"Nebulor",
		"Stellarium",
		"Xor'gath",
		"Valkyron",
		"Zephyrion",
		"Astronix",
		"Lyra'xis",
		"Nocturna",
	];

	const randomName = name[Math.floor(Math.random() * name.length)];
	return randomName;
}

const randomAlienShipName = getRandomAlienShipName();
