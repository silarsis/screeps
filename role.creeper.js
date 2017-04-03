function nearestEnergySink(creep) {
    var energySinks = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    });
    if (energySinks.length) { return energySinks[0] } else { return null };
}

function nearestConstructionSite(creep) {
    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length) { return constructionSites[0] } else { return null };
}

var roleCreeper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // If need energy, go harvest
        if (creep.memory.mode == 'harvest') {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                creep.memory.mode = 'working';
                creep.say('🚧 working');
            }
        }
        if (creep.memory.mode == 'working') {
            if (creep.carry.energy == 0) {
                creep.memory.mode = 'harvest';
                creep.say('🔄 harvest');
            } else {
                var target = null;
                if (target = nearestConstructionSite(creep)) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else if (target = nearestEnergySink(creep)) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                } else {
                    if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleCreeper;
