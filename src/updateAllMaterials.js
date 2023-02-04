import * as THREE from 'three'
import { environmentMap } from './environmentMap'

// Update all materials
const updateAllMaterials = (scene) => {
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            if (child.geometry.type !== 'CircleGeometry') {
                child.material.envMap = environmentMap
                child.material.envMapIntensity = 1.5 // needs to be variable here
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true    
            }
        }
    })
}

export { updateAllMaterials }