import * as THREE from 'three'

const cubeTextureLoader = new THREE.CubeTextureLoader()

// Environment Map
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/19/px.png',
    '/textures/environmentMaps/19/nx.png',
    '/textures/environmentMaps/19/py.png',
    '/textures/environmentMaps/19/ny.png',
    '/textures/environmentMaps/19/pz.png',
    '/textures/environmentMaps/19/nz.png'
])
environmentMap.encoding = THREE.sRGBEncoding


export { environmentMap }