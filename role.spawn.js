function currentCarryingCapacity() {
    return _.sum(Game.creeps).map(function (creep) {
        return creep.carryCapacity;
    });
}

let bodyCost = {
    MOVE: 50,
    WORK: 100,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
}

function creepCreateCost(creep) {
    return _.sum(creep.body).map(function (part) {
        return bodyCost[part.type];
    });
}

function currentEnergyPerTick() {
    return currentCarryingCapacity() / timeToCarry;
}

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
}

function spawnNewCreeper() {
    // Currently hard-coded on type of creeper
    if (Game.spawns['Spawn1'].
}

module.exports = {

    /** @param {Spawn} spawn **/
    run: function(spawn) {

        if (currentCarryingCapacity() < requiredCarryingCapacity()) {
            spawnNewCreeper();
        }
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
