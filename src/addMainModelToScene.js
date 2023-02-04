import { updateAllMaterials } from './updateAllMaterials'

export default function addMainModelToScene(modelsArray, mainModel, scene) {
    modelsArray.then(result => {
        for (const components of result[0].components) {
            mainModel.add(components)
        }
        mainModel.rotation.y = Math.PI * 1.25
        mainModel.scale.set(1, 1, 1)
        scene.add(mainModel)
        updateAllMaterials(scene)
    })
 
}
