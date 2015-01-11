"use strict";

define(function() {

    var module = function () {
        var textures = {};

        var texturesLoadedSum = 0;
        var allTexturesSum = 8; // TODO HARDCODED

        this.loadTexturesAsynchronously = function () {
            THREE.ImageUtils.loadTexture("media/images/floor.jpg", undefined, function (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(10, 10);
                textures["floor"] = texture;
                texturesLoadedSum++;
            });


            THREE.ImageUtils.loadTexture("media/images/wall.jpg", undefined, function (texture) {
                textures["wall"] = texture;
                texturesLoadedSum++;
            });

            textures["skybox"] = [
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_right.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                }),
                    side: THREE.BackSide
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_left.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                    }),
                    side: THREE.BackSide
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_top.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                    }),
                    side: THREE.BackSide
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_base.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                    }),
                    side: THREE.BackSide
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_front.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                    }),
                    side: THREE.BackSide
                }),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture("media/images/sky_back.jpg", undefined, function(texture) {
                        texturesLoadedSum++;
                    }),
                    side: THREE.BackSide
                })
            ];
        };

        this.allTexturesLoaded = function () {
            console.log(texturesLoadedSum);
            return texturesLoadedSum == allTexturesSum;
        };

        this.getTextureByName = function(name) {
            if (textures.hasOwnProperty(name)) {
                return textures[name];
            } else {
                // TODO Throw exception
            }
        }

    };

    return module;
});