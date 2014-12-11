define(["libraries/three"], function(ThreeJS) {
    function Player() {
        var energy = 100;
        var speed = 10;
    }

    Player.prototype.getSpeed = function() {
        return this.speed;
    };

    Player.prototype = new THREE.Mesh;
    Player.prototype.constructor = Player;

    return Player;
});