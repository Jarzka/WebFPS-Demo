define(["loading_game_scene", "gameplay_scene", "texture_container"],
    function(LoadingGameScene, GameplayScene, TextureContainer) {

    // TODO Change every module to protoyype
    // TODO Scenet periytyy jostain yhteisestä Scenestä

    return function () {
        var self = this;

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
});