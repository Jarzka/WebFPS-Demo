define(function() {

    var module = function () {
        var textures = {};

        var texturesLoadedSum = 0;
        var allTexturesSum = 2; // TODO HARDCODED

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

            /*
            THREE.ImageUtils.loadTexture("media/images/sky_top.jpg", undefined, function (texture) {
                textures["sky_top"] = texture;
                texturesLoadedSum++;
            });

            THREE.ImageUtils.loadTexture("media/images/sky_left.jpg", undefined, function (texture) {
                textures["sky_left"] = texture;
                texturesLoadedSum++;
            });

            THREE.ImageUtils.loadTexture("media/images/sky_front.jpg", undefined, function (texture) {
                textures["sky_front"] = texture;
                texturesLoadedSum++;
            });

            THREE.ImageUtils.loadTexture("media/images/sky_right.jpg", undefined, function (texture) {
                textures["sky_right"] = texture;
                texturesLoadedSum++;
            });

            THREE.ImageUtils.loadTexture("media/images/sky_back.jpg", undefined, function (texture) {
                textures["sky_back"] = texture;
                texturesLoadedSum++;
            });

            THREE.ImageUtils.loadTexture("media/images/sky_base.jpg", undefined, function (texture) {
                textures["sky_base"] = texture;
                texturesLoadedSum++;
            });
            */

            /*
            var urlPrefix = "media/images/";
            var urls = [
                urlPrefix + "sky_right.jpg", urlPrefix + "sky_left.jpg",
                urlPrefix + "sky_top.jpg", urlPrefix + "sky_base.jpg",
                urlPrefix + "sky_front.jpg", urlPrefix + "sky_back.jpg"];
            textures["skycube"] = THREE.ImageUtils.loadTextureCube(urls);
            //texturesLoadedSum++;
            */

        };

        this.allTexturesLoaded = function () {
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