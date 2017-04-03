
var roleSpawn = require('role.spawn');
var roleCreeper = require('role.creeper');

function creepRole(creep) {
    if (creep.memory.role == 'creeper') {
        return roleCreeper
    }
}

module.exports.loop = function () {
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.spawns) {
        roleSpawn.run(Game.spawns[name]);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creepRole(creep).run(creep);
    }
}
