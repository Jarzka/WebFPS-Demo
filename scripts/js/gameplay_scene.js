"use strict";

define(["libraries/three",
        "libraries/jquery-1.11.1",
        "world_controller",
        "world_renderer",
        "input_controller"],
    function(ThreeJS,
             jQuery,
             WorldController,
             WorldRenderer,
             InputController) {

    var module = function (application) {
        var self = this;
        var application = application;
        var clock;

        var worldController;
        var worldRenderer;
        var textureContainer;
        var inputController;

        var fpsCounterTimestamp = 0;
        var frameCounter = 0;
        var deltaTime;

        function constructor() {
            initialize();
        }

        function initialize() {
            clock = new THREE.Clock();
            worldController = new WorldController(self);
            worldRenderer = new WorldRenderer(worldController);
            inputController = new InputController(worldController);
        }

        this.update = function () {
            inputController.handleInput(deltaTime);
            worldController.update();
            worldRenderer.render();

            deltaTime = clock.getDelta();
            handleFps();
        };

        function handleFps() {
            frameCounter++;

            if (Date.now() >= fpsCounterTimestamp + 1000) {
                $(".fps").text(frameCounter + "fps");
                frameCounter = 0;
                fpsCounterTimestamp = Date.now();
            }
        }

        this.getApplication = function() {
            return application;
        };

        constructor();
    };

    return module;
});