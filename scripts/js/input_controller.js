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

            worldController.getCamera().rotation.y -= movementX / 500; // TODO Hardcoded speed
            // TODO Horizontal rotation
            // TODO Rotation is buggy on Chrome?
        }

        this.handleInput = function(deltaTime) {
            // TODO Implement collission detection
            var player = worldController.getPlayer();
            var camera = worldController.getCamera();

            if (keyboard.pressed("w")) {
                player.position.z = player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime;
                player.position.x = player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime;
            }

            if (keyboard.pressed("a")) {
                player.position.z = player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180) + (90 * Math.PI / 180)) * 120 * deltaTime;
                player.position.x = player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180) + (90 * Math.PI / 180)) * 120 * deltaTime;
            }

            if (keyboard.pressed("s")) {
                player.position.z = player.position.z + Math.sin(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime;
                player.position.x = player.position.x - Math.cos(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime;
            }

            if (keyboard.pressed("d")) {
                player.position.z = player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180) - (90 * Math.PI / 180)) * 120 * deltaTime;
                player.position.x = player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180) - (90 * Math.PI / 180)) * 120 * deltaTime;
            }
        };

        constructor();
    };

    return inputControllerModule;
});