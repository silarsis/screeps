function currentCarryingCapacity() {
    return _.sum(Game.creeps).map(function (creep) {
        return creep.carryCapacity;
    });
};

let bodyCost = {
    MOVE: 50,
    WORK: 100,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
};

function creepCreateCost(creep) {
    return _.sum(creep.body).map(function (part) {
        return bodyCost[part.type];
    });
};

function currentEnergyPerTick() {
    return currentCarryingCapacity() / timeToCarry;
};

function requiredCarryingCapacity() {
    // Cost to regen all creeps plus add a new one,
    // divided by lifetime of creeps and how long it takes
    // to collect and carry back
    var targetSpawnNumber = Game.creeps.length + 1;
    var newSpawnCost = 200; // Static for now
    var timeToCarry = 40; // Static for now, 25 ticks to harvest 50 plus travel
    var totalSpawnCost = _.sum(Game.creeps).map(function (creep) {
        return creepCreateCost(creep);
    }) + newSpawnCost;
    var energyPerTickNeeded = totalSpawnCost / timeToCarry;
    return totalSpawnCost / timeToCarry;
};

module.exports = {
    /** @param {Spawn} spawn **/
    run: function(spawn) {
        spawn.createCreep([MOVE, CARRY, WORK], {role: 'harvester'});
    }
};
