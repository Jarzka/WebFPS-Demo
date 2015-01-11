"use strict";

define(["map", "player"], function(Map, Player) {

    var module = function (gameplayScene) {
        var gameplayScene = gameplayScene;
        var scene;
        var camera;
        var player;

        function constructor() {
            initialize();
        }

        function initialize() {
            initializeScene();
            initializeCamera();
            initializeWorld();
            initializePlayer();
        }

        function initializePlayer() {
            player = new Player();
            player.position.x = 150;
            //player.position.y = 70; TODO When physics implemented
            player.position.y = 5;
            player.position.z = 150;
        }

        function initializeScene() {
            scene = new THREE.Scene();
        }

        function initializeCamera() {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        }

        function initializeMap() {
            // TODO Map constructed wrong
            var map = new Map();
            var mapLines = Map.map.split("\n");
            for (var lineIndex = 0; lineIndex < mapLines.length; lineIndex++) {
                var line = mapLines[lineIndex];
                for (var charIndex = 0; charIndex < line.length; charIndex++) {
                    insertGameplayObjectToWorld(line.charAt(charIndex), charIndex * Map.getTileSize(), 0, lineIndex * Map.getTileSize());
                }
            }

            // Floor
            var geometry = new THREE.PlaneGeometry(Map.getWidth(), Map.getHeight(), 1, 1);
            var material = new THREE.MeshBasicMaterial({map: gameplayScene.getApplication().getTextureContainer().getTextureByName("floor")});
            var floor = new THREE.Mesh(geometry, material);
            floor.position.x = Map.getWidth() / 2 - (Map.getTileSize() / 2);
            floor.position.y = -Map.getTileSize() / 2;
            floor.position.z = Map.getHeight() / 2 - (Map.getTileSize() / 2);
            floor.rotation.x = -90 * Math.PI / 180;
            floor.castShadow = true;
            floor.receiveShadow = true;
            scene.add(floor);

            // Light
            // TODO Shadows look strange
            var light = new THREE.DirectionalLight(0xf6e86d, 1);
            // light.shadowCameraVisible = true;
            light.position.x = -Map.getTileSize();
            light.position.y = Map.getTileSize() + 5;
            light.position.z = -Map.getTileSize();
            light.target.position.x = Map.getTileSize() * 5;
            light.target.position.y = 80;
            light.target.position.z = Map.getTileSize() * 5;
            light.castShadow = true;
            scene.add(light);

            // Fog
            //scene.fog = new THREE.FogExp2(0x9db3b5, 0.002); // TODO Hides skybox
        }

        function initializeWorld() {
            initializeSky();
            initializeMap();
        }

        function initializeSky() {
            var sky = new THREE.Mesh(
                new THREE.CubeGeometry(5000, 5000, 5000),
                new THREE.MeshFaceMaterial(gameplayScene.getApplication().getTextureContainer().getTextureByName("skybox")));
            sky.position.x = Map.getWidth() / 2;
            sky.position.z = Map.getHeight() / 2;
            scene.add(sky);
        }

        function insertGameplayObjectToWorld(name, x, y, z) {
            if (name == 'X') {
                var geometry = new THREE.CubeGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({map: gameplayScene.getApplication().getTextureContainer().getTextureByName("wall")});
                var wall = new THREE.Mesh(geometry.clone(), material);
                wall.position.x = x;
                wall.position.z = z;
                wall.scale.x = Map.getTileSize();
                wall.scale.y = Map.getTileSize();
                wall.scale.z = Map.getTileSize();
                wall.castShadow = true;
                wall.receiveShadow = true;
                scene.add(wall);
            }
        }

        this.update = function() {
            camera.position.x = player.position.x;
            camera.position.y = player.position.y + 5;
            camera.position.z = player.position.z;
        };

        this.getCamera = function () {
            return camera;
        };

        this.getThreeJSScene = function () {
            return scene;
        };

        this.getGameplayScene = function() {
            return gameplayScene;
        };

        this.getPlayer = function() {
            return player;
        };

        constructor();
    };

    return module;
});