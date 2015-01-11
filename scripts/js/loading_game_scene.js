"use strict";

define(["gameplay_scene"], function(GamePlayScene) {
    var module = function (application) {
        var application = application;
        var textureContainer = application.getTextureContainer();
        var startedLoadingTextures = false;

        this.update = function () {
            starLoadingTextures();
            checkTextureLoadingState();
            render();
        };

        function starLoadingTextures() {
            if (!startedLoadingTextures) {
                textureContainer.loadTexturesAsynchronously();
                startedLoadingTextures = true;
            }
        }

        function checkTextureLoadingState() {
            if (textureContainer.allTexturesLoaded()) {
                application.changeScene(new GamePlayScene(application));
            }
        }

        function render() {
            // TODO
        }
    };

    return module;
});