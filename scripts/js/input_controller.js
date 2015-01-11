"use strict";

define(["libraries/THREEx.KeyboardState", "libraries/jquery-1.11.1"], function(Threex) {

    var inputControllerModule = function(worldController) {
        var keyboard;
        var worldController = worldController;

        function constructor() {
            initialize();
        }

        function initialize() {
            keyboard = new THREEx.KeyboardState();
            $("canvas").click(requestPointerControl); // Request works only from event
        }

        function requestPointerControl() {
            var canvas = $("canvas").get(0);
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            canvas.requestPointerLock();

            document.addEventListener('pointerlockchange', pointerLockStateChanged, false);
            document.addEventListener('mozpointerlockchange', pointerLockStateChanged, false);
            document.addEventListener('webkitpointerlockchange', pointerLockStateChanged, false);

            document.addEventListener("mousemove", handleMouseMovement, false);
        }

        function pointerLockStateChanged(event) {
            // TODO Check if request failed
        }

        function handleMouseMovement(event) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            worldController.getCamera().rotateY(-movementX / 500); // TODO Hardcoded speed
            //worldController.getCamera().rotateX(-movementY / 100); // TODO Does not work
        }

        this.handleInput = function(deltaTime) {
            // TODO Use the camera angle to walk forward
            var player = worldController.getPlayer();
            if (keyboard.pressed("w")) {
                player.position.z = player.position.z - /*player.getSpeed()*/ 50 * deltaTime;
            }

            if (keyboard.pressed("a")) {
                player.position.x = player.position.x - /*player.getSpeed()*/ 50 * deltaTime;
            }

            if (keyboard.pressed("s")) {
                player.position.z = player.position.z + /*player.getSpeed()*/ 50 * deltaTime;
            }

            if (keyboard.pressed("d")) {
                player.position.x = player.position.x + /*player.getSpeed()*/ 50 * deltaTime;
            }
        };

        constructor();
    };

    return inputControllerModule;
});