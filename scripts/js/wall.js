"use strict";

define(["libraries/three"], function(ThreeJS) {
    // TODO Inherit from AbstractGameplayObject?

    function Wall() {
        var self = this;
        var collisionMask;
    }

    // Wall.prototype = new THREE.Mesh;
    // Wall.prototype.constructor = Wall;

    return Wall;
});