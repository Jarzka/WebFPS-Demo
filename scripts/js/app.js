"use strict";

define(["loading_game_scene", "gameplay_scene", "texture_container"],
    function(LoadingGameScene, GameplayScene, TextureContainer) {

    // TODO Scenet periytyy jostain yhteisestä Scenestä

    var module = function () {
        var self = this; // "this" might reference to global scope in certain situations.

        var textureContainer = new TextureContainer();
        var activeScene;

        function constructor() {
            initialize();
            run();
        }

        function initialize() {
            activeScene = new LoadingGameScene(self);
        }

        function run() {
            window.requestAnimationFrame(executeGameFrame);
        }

        function executeGameFrame() {
            activeScene.update();
            window.requestAnimationFrame(executeGameFrame);
        }

        this.changeScene = function(scene) {
            activeScene = scene;
        };

        this.getTextureContainer = function() {
            return textureContainer;
        };

        constructor();
    };

    return module;
});