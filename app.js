class Ship {
	constructor(hull, firepower, accuracy, name) {
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy;
		this.name = name;
	}

	// Attack the other ship
	attack(otherShip) {
		if (this.hull <= 0 || otherShip.hull <= 0) return; // incase the attack method is fired by a dead ship, exit function
		// accuracy condition
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
		// condition when a single ship is destroyed
		if (otherShip.hull <= 0) {
			console.log(`%c${otherShip.name} ship is destoryed!`, "color: red;");
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

	// Create a new instance
	const alienShip = new Ship(
		hull,
		firepower,
		accuracy,
		getRandomAlienShipName()
	); 
	alienShips.push(alienShip); // Add the instance to the array
}

const USS_Assembly = new Ship(20, 5, 0.7, "USS Assembly");

let battleOver = false;

// Function to create a promise that resolves when the attack button is pressed
const waitForAttack = () => {
	return new Promise((resolve) => {
		const attack = document.querySelector(".attack-button");
		attack.onclick = () => {
			resolve(); // Resolve the promise when the attack button is pressed
		};
	});
};

// Battle until my ship is destroyed or all enemy ships are destroyed
(async () => {
	for (let i = 0; i < alienShips.length; i++) {
		const alienShip = alienShips[i];

		await waitForAttack(); // Wait for the attack button to be pressed
		const retreat = document.querySelector(".retreat-button");
		retreat.onclick = () => {
			battleOver = true;
			console.log("%cUSS Assembly has retreated", "color: yellow;");
		};

		if (battleOver) {
			break;
		}
		// fight a single alien ship
		while (USS_Assembly.hull > 0 && alienShip.hull > 0) {
			USS_Assembly.attack(alienShip);
			alienShip.attack(USS_Assembly);
			if (USS_Assembly.hull <= 0) { // lose condition
				console.log("%cYou Lose.", "color: red;");
				battleOver = true;
				break;
			}
		}

		if (battleOver) {
			break;
		}
		// win condition
		if (i === alienShips.length - 1) {
			console.log("%cYou Win.", "color: green;");
			battleOver = true;
			break;
		}
	}
})();

// random name for an alien ship
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
