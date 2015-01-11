"use strict";

define(["libraries/three"], function(ThreeJS) {
    function Player() {
        var self = this;
        var energy = 100;
        var speed = 80;
    }

    Player.prototype.getSpeed = function() {
        return self.speed;
    };

    Player.prototype = new THREE.Mesh;
    Player.prototype.constructor = Player;

    return Player;
});