import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

async function modelLoader(source, loadingManager) {
    const gltfLoader = new GLTFLoader(loadingManager);
    const promises = [];
    for (let i = 0; i < source.length; i++) {
      promises.push(
        new Promise((resolve) => {
          const model = {}
          model.name = source[i].name;
          model.images = source[i].images
          gltfLoader.load(source[i].file, (gltf) => {
            const children = [...gltf.scene.children];
              model.components = children;
            resolve(model);
          });
        })
      );
    }
    return await Promise.all(promises);
  }


export { modelLoader }
