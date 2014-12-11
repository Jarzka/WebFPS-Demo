define(["libraries/THREEx.KeyboardState"], function(Threex) {

    var inputControllerModule = function(worldController) {
        var keyboard;
        var worldController = worldController;

        function constructor() {
            initialize();
        }

        function initialize() {
            keyboard = new THREEx.KeyboardState();
        }

        this.handleInput = function(deltaTime) {
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
        }

        constructor();
    };

    return inputControllerModule;
});