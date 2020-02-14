// create scene
var graphicsContainer = {
    scene: null,
    sceneObjects: {},
    renderer: null,
    camera: null,
    statsContainer: {
        highestFitnessScore: 0,
        averageFitness: 0
    },
    statsDiv: null,
    statusDiv: null
};

var worldObjects = {
    world: null,
    playerOne: null
}

var population;
var frame = 1;
var timeStep = 1/60;

window.addEventListener('DOMContentLoaded', (event) => {
    // graphics
    initGraphics(graphicsContainer);
    initCannon(worldObjects);
    graphicsContainer.statsDiv = document.getElementById("stats");
    graphicsContainer.statusDiv = document.getElementById("status");

    // genetics
    worldObjects.playerOne = new Ship(new CANNON.Vec3(0,0,0), graphicsContainer, worldObjects.world);

    animate();

    document.addEventListener('keydown', keyPressed);
});

window.addEventListener('resize', (event) => {
    graphicsContainer.camera.aspect = window.innerWidth / window.innerHeight;
    graphicsContainer.camera.updateProjectionMatrix();
    graphicsContainer.renderer.setSize(window.innerWidth, window.innerHeight);
    updateSanityCube(graphicsContainer.camera);
});

function keyPressed(e) {
    console.log(e.code);
    switch (e.code) {
        case "KeyW":
            worldObjects.playerOne.thrust();
            break;
        case "KeyA":
            worldObjects.playerOne.rotateCC();
            break;
        case "KeyD":
            worldObjects.playerOne.rotateC();
    }
}

function animate() {
    // if (frame % population.generationLifetime == 0) {
    //     frame = 1;
    //     population.fitness(target);
    //     population.selection();
    //     population.reproduction();
    //     // population.resetPopulation();
    // } else {
    //     frame++;
    //     population.update();
    //     population.checkCollisions(obstacles);
    // }

    updateStatsDisplay();
    updateStatusDisplay();

    // update world physics
    worldObjects.world.step(timeStep);

    // update player
    worldObjects.playerOne.update();

    // animate sanity cube
    graphicsContainer.sceneObjects.sanityCube.rotation.x += 0.01;
    graphicsContainer.sceneObjects.sanityCube.rotation.y += 0.01;
    graphicsContainer.renderer.render(graphicsContainer.scene, graphicsContainer.camera);
    requestAnimationFrame( animate );
}

function updateStatsDisplay() {
    let statsString = "Stats";

    graphicsContainer.statsDiv.innerHTML = statsString;
}

function updateStatusDisplay() {
    let statusString = "Status"
    graphicsContainer.statusDiv.innerHTML = statusString;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value === 64 ? 32 : value;
}
