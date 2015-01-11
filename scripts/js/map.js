"use strict";

/* Map is used to construct the game world. It is not updated if the world is changed. */

define([], function() {
    var module = function() {
    };

    /* Map legend:
     * X = Wall
     *   = Free space
     * R = Respawn point
     */
    module.map =
        "XXXXXXXXXXXXXXXX\n" +
        "X    R         X\n" +
        "X RX X X   XX  X\n" +
        "X XXXXR   XX   X\n" +
        "X XR           X\n" +
        "X      X XXXXXXX\n" +
        "X XXXXXX X\n" +
        "X     RX X\n" +
        "X  X     X\n" +
        "XXXXXXXXXX\n";

    module.getWidth = function() {
        var highest = 0;
        var lines = module.map.split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].length > highest) {
                highest = lines[i].length;
            }
        }

        return highest * module.getTileSize();
    };

    module.getHeight = function() {
        return module.map.split("\n").length * module.getTileSize();
    };

    module.getTileSize = function() {
        return 100;
    };

    return module;
});