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
            // Check if Pointerlock API is available
            var isPointerlockSupported = 'pointerLockElement' in document
                || 'mozPointerLockElement' in document
                || 'webkitPointerLockElement' in document;

            if (isPointerlockSupported) {  // Request pointer lock
                var canvas = $("canvas").get(0);
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                canvas.requestPointerLock();

                document.addEventListener('pointerlockchange', pointerLockStateChanged, false);
                document.addEventListener('mozpointerlockchange', pointerLockStateChanged, false);
                document.addEventListener('webkitpointerlockchange', pointerLockStateChanged, false);
            } else {
                $(".pointerlock-not-supported").css("display", "block");
            }
        }

        function pointerLockStateChanged(event) {
            var canvas = $("canvas").get(0);

            if (document.pointerLockElement === canvas ||
                document.mozPointerLockElement === canvas ||
                document.webkitPointerLockElement === canvas) {
                // Pointer was locked successfully, enable mousemove listener
                document.addEventListener("mousemove", handleMouseMovement, false);
            }
        }

        function handleMouseMovement(event) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            worldController.getCamera().rotation.y -= movementX / 500; // TODO Hardcoded speed
            // TODO Vertical rotation
            // TODO Rotation is buggy on Chrome?
        }

        this.handleInput = function(deltaTime) {
            // TODO Implement collision detection
            var player = worldController.getPlayer();
            var camera = worldController.getCamera();

            // TODO Get speed from player
            // TODO Use vectors here
            if (keyboard.pressed("w")) {
                var nextPointW = new THREE.Vector3(
                    player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime,
                    player.position.y,
                    player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime);

                if (!worldController.onCollision(nextPointW)) {
                    player.position.z = nextPointW.z;
                    player.position.x = nextPointW.x;
                }
            }

            if (keyboard.pressed("a")) {
                var nextPointA = new THREE.Vector3(
                    player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180) + (90 * Math.PI / 180)) * 120 * deltaTime,
                    player.position.y,
                    player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180) + (90 * Math.PI / 180)) * 120 * deltaTime);

                if (!worldController.onCollision(nextPointA)) {
                    player.position.z = nextPointA.z;
                    player.position.x = nextPointA.x;
                }
            }

            if (keyboard.pressed("s")) {
                var nextPointS = new THREE.Vector3(
                    player.position.x - Math.cos(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime,
                    player.position.y,
                    player.position.z + Math.sin(camera.rotation.y + (90 * Math.PI / 180)) * 120 * deltaTime);

                if (!worldController.onCollision(nextPointS)) {
                    player.position.z = nextPointS.z;
                    player.position.x = nextPointS.x;
                }
            }

            if (keyboard.pressed("d")) {
                var nextPointD = new THREE.Vector3(
                    player.position.x + Math.cos(camera.rotation.y + (90 * Math.PI / 180) - (90 * Math.PI / 180)) * 120 * deltaTime,
                    player.position.y,
                    player.position.z - Math.sin(camera.rotation.y + (90 * Math.PI / 180) - (90 * Math.PI / 180)) * 120 * deltaTime);

                if (!worldController.onCollision(nextPointD)) {
                    player.position.z = nextPointD.z;
                    player.position.x = nextPointD.x;
                }
            }
        };

        constructor();
    };

    return inputControllerModule;
});