import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js' 
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js' 
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js' 
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js' 
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js' 
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js' 
import * as lil from 'lil-gui'
import { modelLoader } from './loader.js'
import { updateAllMaterials } from './updateAllMaterials.js'
import addMainModelToScene from './addMainModelToScene.js'
import configurator from './configurator.js'
import { gsap } from 'gsap'





const source = [
    // Standard Model
    {
        file: '/models/mustang.glb',
        name: 'Standard',
        images: [
            {
                image: 'images/standard/body.png',
                name: 'Body',
                material: 'Standard'
            },
            {
                image: 'images/standard/brakeLightFrameStandard2.png',
                name: 'Brake Light Frame',
                material: 'Standard'
            },
            {
                image: 'images/standard/doorAirDuctRed.png',
                name: 'Door Air Duct',
                material: 'Standard'
            },
            {
                image: 'images/standard/frontBumperStandard.png',
                name: 'Front Bumper',
                material: 'Standard'
            },
            {
                image: 'images/standard/mirrorStandard.png',
                name: 'Mirrors',
                material: 'Standard'
            },
            {
                image: 'images/standard/rearBadgeStandard.png',
                name: 'Rear Badge',
                material: 'Standard'
            },
            {
                image: 'images/standard/rearBumperStandard.png',
                name: 'Rear Bumper',
                material: 'Standard'
            },
            {
                image: 'images/standard/rearFogLightStandard.png',
                name: 'Rear Fog Light ',
                material: 'Standard'
            },
            {
                image: 'images/standard/standardWheel.png',
                name: 'Rims',
                material: 'Standard'
            },
            {
                image: 'images/standard/UpperAirDuctRed.png',
                name: 'Upper Air Duct',
                material: 'Standard'
            },
            {
                image: 'images/standard/windowFramesStandard.png',
                name: 'Window Frames',
                material: 'Standard'
            },
            {
                image: 'images/standard/redColor.png',
                name: 'Standard Color',
                material: 'Standard'
            },
            {
                image: 'images/air ducts/doorAirDuctBlue.png',
                name: 'Door Air Duct',
                material: 'Blue'
            },
            {
                image: 'images/air ducts/doorAirDuctGlossBlack.png',
                name: 'Door Air Duct',
                material: 'Black'
            },
            {
                image: 'images/air ducts/doorAirDuctGreen.png',
                name: 'Door Air Duct',
                material: 'Green'
            },
            {
                image: 'images/air ducts/doorAirDuctGrey.png',
                name: 'Door Air Duct',
                material: 'Grey'
            },
            {
                image: 'images/air ducts/doorAirDuctMattBlack.png',
                name: 'Door Air Duct',
                material: 'Matt Black'
            },
            {
                image: 'images/air ducts/doorAirDuctWhite.png',
                name: 'Door Air Duct',
                material: 'White'
            },
            {
                image: 'images/air ducts/doorAirDuctYellow.png',
                name: 'Door Air Duct',
                material: 'Yellow'
            },
            {
                image: 'images/air ducts/UpperAirDuctBlue.png',
                name: 'Upper Air Duct',
                material: 'Blue'
            },
            {
                image: 'images/air ducts/UpperAirDuctGlossBlack.png',
                name: 'Upper Air Duct',
                material: 'Black'
            },
            {
                image: 'images/air ducts/UpperAirDuctGreen.png',
                name: 'Upper Air Duct',
                material: 'Green'
            },
            {
                image: 'images/air ducts/UpperAirDuctGrey.png',
                name: 'Upper Air Duct',
                material: 'Grey'
            },
            {
                image: 'images/air ducts/UpperAirDuctMattBlack.png',
                name: 'Upper Air Duct',
                material: 'Matt Black'
            },
            {
                image: 'images/air ducts/UpperAirDuctWhite.png',
                name: 'Upper Air Duct',
                material: 'White'
            },
            {
                image: 'images/air ducts/UpperAirDuctYellow.png',
                name: 'Upper Air Duct',
                material: 'Yellow'
            },
        ]
    }, 
    // Body Colors
    {
        file: '/models/blueBody.glb',
        name: 'Blue',
        images: [
           { 
            image: 'images/colors/blueColor.png',
            name: 'Body'
            } 
        ]
    },
    {
        file: '/models/blackBody.glb',
        name: 'Black',
        images: [
            { 
             image: 'images/colors/glossBlackColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/mattBlackBody.glb',
        name: 'Matt Black',
        images: [
            { 
             image: 'images/colors/mattBlackColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/greenBody.glb',
        name: 'Green',
        images: [
            { 
             image: 'images/colors/greenColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/yellowBody.glb',
        name: 'Yellow',
        images: [
            { 
             image: 'images/colors/yellowColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/greyBody.glb',
        name: 'Grey',
        images: [
            { 
             image: 'images/colors/greyColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/whiteBody.glb',
        name: 'White',
        images: [
            { 
             image: 'images/colors/whiteColor.png',
             name: 'Body'
             } 
         ]
     },
    {
        file: '/models/wheelOneBlack.glb',
        name: 'Standard Black',
        images: [
            {
             image: 'images/wheels/standardWheelBlack.png',
             name: 'Rims'
            }
        ]    
    },
    {
        file: '/models/hotRodRims.glb',
        name: 'Hotrod',
        images: [
            {
            image: 'images/wheels/hotrodWheelBlack.png',
            name: 'Rims'
            }
        ]    
    },
    //Gloss Components
    {
        file: '/models/glossBlackComponents.glb',
        name: 'Gloss Black',
        images: [
            {
                image: 'images/gloss black components/brakeLightFrameGlossBlack.png',
                name: 'Brake Light Frame'     
            },
            {
                image: 'images/gloss black components/frontBumperGlossBlack.png',
                name: 'Front Bumper'     
            },
            {
                image: 'images/gloss black components/mirrorGlossBlack.png',
                name: 'Mirrors'     
            },
            {
                image: 'images/gloss black components/rearBumperGlossBlack.png',
                name: 'Rear Bumper'     
            },
            {
                image: 'images/gloss black components/rearFogLightGlossBlack.png',
                name: 'Rear Fog Light '     
            },
            {
                image: 'images/gloss black components/windowFramesGlossBlack.png',
                name: 'Window Frames'     
            },
        ]
    },
    // Matt Black Components
    {
        file: '/models/mattBlackComponents.glb',
        name: 'Matt Black',
        images: [
            {
                image: 'images/matt black components/brakeLightFrameMattBlack.png',
                name: 'Brake Light Frame'     
            },
            {
                image: 'images/matt black components/frontBumperMattBlack.png',
                name: 'Front Bumper'     
            },
            {
                image: 'images/matt black components/mirrorMattBlack.png',
                name: 'Mirrors'     
            },
            {
                image: 'images/matt black components/rearBumperMattBlack.png',
                name: 'Rear Bumper'     
            },
            {
                image: 'images/matt black components/rearFogLightMattBlack.png',
                name: 'Rear Fog Light '     
            },
            {
                image: 'images/matt black components/windowFramesMattBlack.png',
                name: 'Window Frames'     
            },
        ]
    },
    // Badge
    {
        file: '/models/roundRearBadge.glb',
        name: 'Round Badge',
        images: [
            {
                image: 'images/badges/rearBadgeRound.png',
                name: 'Rear Badge'
            }
        ]        
    },
    // Gloss Black Air Ducts
    {
        file: '/models/airDuctsGlossBlack.glb',
        name: 'Gloss Black',
        images: [
            {
                image: 'images/air ducts/doorAirDuctGlossBlack.png',
                name: 'Door Air Duct'
            },
            {
                image: 'images/air ducts/UpperAirDuctGlossBlack.png',
                name: 'Upper Air Duct'
            }
        ]
    },
    // Matt Black Air Ducts
    {
        file: '/models/airDuctsMattBlack.glb',
        name: 'Matt Black',
        images: [
            {
                image: 'images/air ducts/doorAirDuctMattBlack.png',
                name: 'Door Air Duct'
            },
            {
                image: 'images/air ducts/UpperAirDuctMattBlack.png',
                name: 'Upper Air Duct'
            }
        ]
    },
]

const loadingBarElement = document.querySelector('.loading-bar')

const loadingManager = new THREE.LoadingManager(
    () => {
        window.setTimeout(() => {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 0, value: 0 })
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ``
            editButton.style.display = 'flex'
    
        }, 500)

    },
    (itemUrl, itemLoaded, itemTotal) => {
        const progressRatio = itemLoaded / itemTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)



// Debug
const gui = new lil.GUI()
const debugObject = {}
gui.hide()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = environmentMap
// scene.environment = environmentMap

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)



// get all models
const allModels = modelLoader(source, loadingManager)
const mainModel = new THREE.Group()


// add main model to scene
addMainModelToScene(allModels, mainModel, scene)

//
//
// Sizes
//
//
let sizesMultiplier = 1
const sizes = {
    width: window.innerWidth * sizesMultiplier,
    height: window.innerHeight
}



//
//
// Floor
//
//
const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#030303',
    metalness: 0,
    roughness: 0
})
floorMaterial.side = THREE.DoubleSide
const floor = new THREE.Mesh(
    new THREE.CircleGeometry(10, 64),
    floorMaterial    
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.position.y = - 0.142
scene.add(floor)

const platformMaterial = new THREE.MeshStandardMaterial({
    color: '#030303',
    metalness: 0.8,
    roughness: 0.08
})


const platform = new THREE.Mesh(
    new THREE.CylinderGeometry( 3, 3, 0.15, 64 ),
    platformMaterial

)
platform.position.y = - 0.065
scene.add(platform)


// gui.addColor(floorMaterial, 'color')
// gui.add(floorMaterial, 'roughness').min(0).max(1).step(0.001)
// gui.add(floorMaterial, 'metalness').min(0).max(1).step(0.001)

// gui.addColor(platformMaterial, 'color')
// gui.add(platformMaterial, 'roughness').min(0).max(1).step(0.001)
// gui.add(platformMaterial, 'metalness').min(0).max(1).step(0.001)



//
//
// Lights
//
//
const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
// directionalLight.position.set(0.5, 2.5, 8)
directionalLight.position.set(2.8, 3, 8)
directionalLight.rotation.y = 0.3
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
scene.add(directionalLight)

// const directionalLightCameraHelper = new THREE.DirectionalLightHelper(directionalLight, 2)
// scene.add(directionalLightCameraHelper)

const directionalLightTwo = new THREE.DirectionalLight('#ffffff', 2)
// directionalLightTwo.position.set(3, 11, - 10)
// directionalLightTwo.position.set(5, 3, -10)
directionalLightTwo.position.set(1, 6, -3)


directionalLightTwo.castShadow = true
directionalLightTwo.shadow.camera.far = 20
directionalLightTwo.shadow.mapSize.set(1024, 1024)
directionalLightTwo.shadow.normalBias = 0.05

scene.add(directionalLightTwo)



// const directionalLightCameraHelperTwo = new THREE.DirectionalLightHelper(directionalLightTwo, 2)
// scene.add(directionalLightCameraHelperTwo)


// const pointLight = new THREE.PointLight('#ffffff', 1, 100);
// pointLight.position.set(0.5, 2.5, 8);
// pointLight.rotation.x = 0
// // scene.add(pointLight);

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// // scene.add( pointLightHelper );

gui.add(directionalLight.position, 'x').name('lightX')
gui.add(directionalLight.position, 'y').name('lightY')
gui.add(directionalLight.position, 'z').name('lightZ')
gui.add(directionalLight.rotation, 'y').name('light rotation Y')
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('point intensity')
// gui.add(directionalLight, 'distance').min(0).max(10).step(0.001).name('point distance')
// gui.add(directionalLight, 'decay').min(0).max(10).step(0.001).name('point decay')

gui.add(directionalLightTwo.position, 'x').name('lightX')
gui.add(directionalLightTwo.position, 'y').name('lightY')
gui.add(directionalLightTwo.position, 'z').name('lightZ')
gui.add(directionalLightTwo.rotation, 'y').name('light rotation Y')
gui.add(directionalLightTwo, 'intensity').min(0).max(10).step(0.001).name('point intensity')
// gui.add(directionalLightTwo, 'distance').min(0).max(10).step(0.001).name('point distance')
// gui.add(directionalLightTwo, 'decay').min(0).max(10).step(0.001).name('point decay')



// const spotLight = new THREE.SpotLight('#ffffff');
// spotLight.position.set(0, 4, 2);
// spotLight.intensity = 9
// spotLight.angle = 1
// spotLight.penumbra = 1
// spotLight.decay = 0
// spotLight.castShadow = true
// scene.add(spotLight)

// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );

// gui.add(spotLight.position, 'x').min(- 10).max(10).step(0.001).name('spot lightX')
// gui.add(spotLight.position, 'y').min(- 10).max(10).step(0.001).name('spot lightY')
// gui.add(spotLight.position, 'z').min(- 10).max(10).step(0.001).name('spot lightZ')
// gui.add(spotLight, 'intensity').min(- 10).max(10).step(0.001).name('spot intensity')
// gui.add(spotLight, 'distance').min(- 10).max(10).step(0.001).name('spot distance')
// gui.add(spotLight, 'angle').min(- 10).max(10).step(0.001).name('spot angle')
// gui.add(spotLight, 'penumbra').min(0).max(1).step(0.001).name('spot penumbra')
// gui.add(spotLight, 'decay').min(- 10).max(10).step(0.001).name('spot decay')


// resize canvas function
function resizeFunc() {
    // Update sizes
    sizes.width = window.innerWidth * sizesMultiplier
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

}

window.addEventListener('resize', resizeFunc)


//
//
// Camera
//
//
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1.5, 6)
scene.add(camera)

//
//
// Controls
//
//
// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.07
controls.enabled = true
controls.enablePan = false
controls.maxPolarAngle = Math.PI * 0.5
controls.maxDistance = 8.5
controls.minDistance = 4

//
//
// EDIT MODE
//
//  
const editButton = document.getElementById("editButton")
editButton.addEventListener('click', enterEditMode)
const sideMenu = document.getElementById('sideMenu')
const sideMenuCloseBtn = document.getElementById('closeButton')
sideMenuCloseBtn.addEventListener('click', exitEditMode)

// change to edit mode
let editMode = false 
function enterEditMode() {
    sizesMultiplier = 0.8
    resizeFunc()
    editButton.style.display = 'none'
    sideMenu.style.display = 'flex'
    editMode = true
    outlinePass.enabled = true
    document.getElementById('outlineToggle').style.display = 'flex'
}

// exit edit mode
function exitEditMode() {
    sizesMultiplier = 1
    resizeFunc()
    sideMenu.style.display = 'none'
    editButton.style.display = 'flex'
    editMode = false
    outlinePass.enabled = false
    document.getElementById('outlineToggle').style.display = 'none'
}

const outlineSwitch = document.getElementById('outlineSwitch')
outlineSwitch.checked = true
outlineSwitch.addEventListener('click', () => {
    if (outlineSwitch.checked) {
        outlinePass.enabled = true
    } else if (!outlineSwitch.checked) {
        outlinePass.enabled = false
    }    
})


// Outline components
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

canvas.addEventListener('mousemove', (event) => {
    let objs = []
    if (editMode) {
        pointer.x = (event.clientX / sizes.width) * 2 - 1;
        pointer.y = - (event.clientY / sizes.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        
        const intersects = raycaster.intersectObjects(mainModel.children)
        outlinePass.selectedObjects = []
        if (intersects.length > 0) {
            const obj = intersects[0].object
            if (obj.userData.isEditable === 'true') {
                if (obj.userData.isMultiMaterial === 'true') {
                    for (const child of obj.parent.children) {
                        objs.push(child)
                    }
                    outlinePass.selectedObjects = objs
                } else {
                    outlinePass.selectedObjects = [obj]
                }
            }
        }
    }
})




//
//
// Renderer
//
//
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.5
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap



//
//
// Post processing
//
//
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)

const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// Outline pass
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
outlinePass.visibleEdgeColor.set('#00A0FF')
outlinePass.hiddenEdgeColor.set('#00A0FF')
outlinePass.edgeGlow = 0.5
outlinePass.edgeStrength = 3
outlinePass.rotate = false
outlinePass.edgeThickness = 1
effectComposer.addPass(outlinePass)


// Gamma correction pass
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)


// SMAA pass
if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)
}


//
//
// Debug GUI
//
//
// envMap gui
// debugObject.envMapIntensity = 2.5
// gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials(scene))
// camera gui
// gui.add(camera.position, 'x').min(- 15).max(15).step(0.001).name('cameraX')
// gui.add(camera.position, 'y').min(- 15).max(15).step(0.001).name('cameraY')
// gui.add(camera.position, 'z').min(- 15).max(15).step(0.001).name('cameraZ')
// renderer gui
// gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping,
// }).onFinishChange(() => {
//     renderer.toneMapping = Number(renderer.toneMapping)
//     updateAllMaterials(scene)
// })
// gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


// Initialize Configurator
configurator(canvas, sizes, camera, allModels, mainModel, scene, outlinePass)


//
//
// Animate
//
//
const tick = () =>
{
    // Update orbit controls
    if (controls.enabled) {
        controls.update()
    }

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()