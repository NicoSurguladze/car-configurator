import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { updateAllMaterials } from './updateAllMaterials'

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const options = document.getElementById('options')
const backBtn = document.getElementById('backBtn')
const stripes = document.getElementById('stripes')
const stripesToggle = document.getElementById('stripesCheckBox')
const secondaryOption = document.getElementById('secondaryOption')
let intersects
let selectedComponent
let currentStripe
const prevBodyColoredComponents = []
const bodyColoredComponents = []




export default function configurator(canvas, sizes, camera, allModels, mainModel, scene, outlinePass) {

    backBtn.addEventListener('click', () => {
        outlinePass.selectedObjects = []
        backBtn.style.display = 'none'
        document.getElementById('componentTypeName').innerHTML = ''
        stripes.style.display = 'none'
        options.style.height = '70vh'
        displayOptions(mainModel, allModels, outlinePass, camera, scene)
    })

    

// Stripes selector
    allModels.then(result => {
        let ogStripe
        let blackStripe
        let blueStripe
        let redStripe
        let yellowStripe

        const whiteBtn = document.getElementById('whiteStripe')
        const blackBtn = document.getElementById('blackStripe')
        const blueBtn = document.getElementById('blueStripe')
        const redBtn = document.getElementById('redStripe')
        const yellowBtn = document.getElementById('yellowStripe')

        // Get colors
        for (const obj of result[0].components) {
            if (obj.name === 'Body') {
                ogStripe = obj.children[1].material
                redStripe = obj.children[0].material
            }
        }
        for (const obj of result[2].components) {
            if (obj.name === 'Body') {
                blackStripe = obj.children[0].material
            }
        }    
        for (const obj of result[5].components) {
            if (obj.name === 'Body') {
                yellowStripe = obj.children[0].material
            }
        }    
        for (const obj of result[7].components) {
            if (obj.name === 'Body') {
                blueStripe = obj.children[1].material
            }
        }    

        currentStripe = ogStripe


        // Toggle Stripes
        stripesToggle.addEventListener('click', () => {
            if (stripesToggle.checked) {
                for (const obj of mainModel.children) {
                    if (obj.name === 'Body') {
                        obj.children[1].material = currentStripe
                    }
                }
            } else if (!stripesToggle.checked) {
                for (const obj of mainModel.children) {
                    if (obj.name === 'Body') {
                        obj.children[1].material = obj.children[0].material
                    }
                }
            }
        })

        // Switch Colors
        whiteBtn.addEventListener('click', () => {
            for (const obj of mainModel.children) {
                if (obj.name === 'Body') {
                    obj.children[1].material = ogStripe
                    currentStripe = ogStripe
                }
            }
        })
        blackBtn.addEventListener('click', () => {
            for (const obj of mainModel.children) {
                if (obj.name === 'Body') {
                    obj.children[1].material = blackStripe
                    currentStripe = blackStripe
                }
            }
        })
        blueBtn.addEventListener('click', () => {
            for (const obj of mainModel.children) {
                if (obj.name === 'Body') {
                    obj.children[1].material = blueStripe
                    currentStripe = blueStripe
                }
            }
        })
        redBtn.addEventListener('click', () => {
            for (const obj of mainModel.children) {
                if (obj.name === 'Body') {
                    obj.children[1].material = redStripe
                    currentStripe = redStripe
                }
            }
        })
        yellowBtn.addEventListener('click', () => {
            for (const obj of mainModel.children) {
                if (obj.name === 'Body') {
                    obj.children[1].material = yellowStripe
                    currentStripe = yellowStripe
                }
            }
        })
    })
    

    displayOptions(mainModel, allModels, outlinePass, camera, scene)

    canvas.addEventListener('click', (event) => {
        intersects = getClickedObject(event, sizes, camera, mainModel, outlinePass)
        if (intersects !== undefined) {
            if (intersects.object.userData.isEditable === 'true') {
                selectedComponent = getSelectedComponent(intersects, mainModel)
                getOptions(selectedComponent, allModels, mainModel, scene)
            }
        }
    })



    
    
}



// function to get clicked object 
function getClickedObject(event, sizes, camera, mainModel) {
    pointer.x = (event.clientX / sizes.width) * 2 - 1;
	pointer.y = - (event.clientY / sizes.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(mainModel.children)

    return intersects[0]
}

// function to get selected component
function getSelectedComponent(intersects, mainModel) {
    let componentToDisplay;
        for (let j = 0; j < mainModel.children.length; j++) {
            if (mainModel.children[j].type === 'Group') {
                for (const component of mainModel.children[j].children) {
                    if (intersects.object.name === component.name) {
                        removeAllChildNodes(document.getElementById('options'))
                        removeAllChildNodes(document.getElementById('secondaryOption'))


                        componentToDisplay = intersects.object.parent
                    }
                }
            } else if (intersects.object.name === mainModel.children[j].name) {
                
                // removes previously displayed component options
                removeAllChildNodes(document.getElementById('options'))
                removeAllChildNodes(document.getElementById('secondaryOption'))


                componentToDisplay = intersects.object
            }
	}
    return componentToDisplay
}


let showSecondary

// function to get options 
function getOptions(selectedComponent, allModels, mainModel, scene) {
    backBtn.style.display = 'block'
    stripes.style.display = 'none'
    if (selectedComponent.type === 'Group') {
        if (selectedComponent.children[0].userData.componentType === 'Body') {
            const options = document.getElementById('options')
            options.style.height = '50vh'
            stripes.style.display = 'flex'
        } else {
            options.style.height = '70vh'
        }
        
    //     document.getElementById('componentTypeName').innerHTML = selectedComponent.children[0].userData.componentType
    //     if (selectedComponent.children[1].userData.bodyColor === 'true') {
    //         showSecondary = true           
    //         options.style.height = '50vh'

    //     } else if (selectedComponent.children[0].userData.componentType === 'Body') {
    //         const options = document.getElementById('options')
    //         options.style.height = '50vh'
    //         stripes.style.display = 'flex'
    //         showSecondary = false           
    //     } else {
    //         showSecondary = false         
    //         options.style.height = '70vh'
    //     }
    // } else {
    //     document.getElementById('componentTypeName').innerHTML = selectedComponent.userData.componentType
    //     if (selectedComponent.userData.bodyColor === 'true') {
    //         showSecondary = true          
    //         options.style.height = '50vh'
    //     } else {
    //         showSecondary = false          
    //         options.style.height = '70vh'
    //     }
    } else {
        options.style.height = '70vh'
    }

    
    allModels.then(result => {
        for (const componentOptions of result) {
            const variantName = componentOptions.name
            for (const componentOption of componentOptions.components) {
                const options = document.getElementById('options')
                if (componentOption.name === selectedComponent.name) {
                    let image
                    if (variantName === 'Standard') {
                        for (const img of componentOptions.images) {
                            if (componentOption.type === 'Group') {
                                if (selectedComponent.children[0].userData.componentType === img.name) {
                                    image = img.image
                                }
                                if (selectedComponent.children[0].userData.componentType === 'Body' && img.name === 'Standard Color') {
                                    image = img.image
                                }
                            } else if (selectedComponent.userData.componentType === img.name && img.material === 'Standard') {
                                 image = img.image
                            } else {
                                for (const obj of mainModel.children) {
                                    if (obj.name === 'Body') {
                                        if (selectedComponent.userData.componentType === img.name && img.material === obj.children[0].material.name) {
                                            image = img.image
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        for (const img of componentOptions.images) {
                            if (selectedComponent.type === 'Group' && selectedComponent.children[0].userData.componentType === img.name) {
                                image = img.image
                            } else if (selectedComponent.userData.componentType === img.name) {
                                image = img.image
                            }
                        }
                    }
        
                    const option = document.createElement('div')
                    option.setAttribute('id', 'option')
                    const optionName = document.createElement('h3')
                    optionName.setAttribute('id', 'optionName')
                    optionName.innerHTML = variantName
                    const optionImg = document.createElement('img')
                    optionImg.setAttribute('id', 'optionImg')
                    optionImg.setAttribute('src', `${image}`)
                    option.appendChild(optionImg)
                    option.appendChild(optionName)
                    options.appendChild(option) 
                    
                    if (componentOption.userData.isBodyColor === 'true' && variantName === 'Standard') {
                        for (const obj of mainModel.children) {
                            if (obj.name === 'Body') {
                                componentOption.material = obj.children[0].material
                            }
                        }
                    }
                    option.addEventListener('click', () => {
                            changeComponent(componentOption, mainModel, scene)
                    })   
                } 
            }
        }
        
    //     if (showSecondary) {
    //         secondaryOption.style.display = 'flex'
    //         const secondaryHeader = document.createElement('h2')
    //         secondaryHeader.setAttribute('id', 'secondaryOptionHeader')
    //         secondaryHeader.innerHTML = 'Same color as body'
    //         secondaryOption.appendChild(secondaryHeader)
    //         const secondaryToggle = document.createElement('input')
    //         secondaryToggle.setAttribute('type', 'checkbox')
    //         secondaryToggle.setAttribute('id', 'secondaryOptionCheckBox')
    //         secondaryOption.appendChild(secondaryToggle)
            
    //         for (const obj of mainModel.children) {
    //             if (obj.name === 'Body') {
    //                 if (selectedComponent.material === obj.children[0].material) {
    //                     secondaryToggle.checked = true
    //                 }
    //             }
    //         }
      
    //         secondaryOption.addEventListener('change', () => {
    //             if (secondaryToggle.checked) {
    //                 for (const obj of mainModel.children) {
    //                     if (obj.name === 'Body') {
    //                         for (const component of mainModel.children) {
    //                             if (component.name === selectedComponent.name) {
    //                                 if (selectedComponent.name === 'Mirrors') {
    //                                     const groupClone = component.clone()
    //                                     groupClone.children[1].material = obj.children[0].material
    //                                     bodyColoredComponents.push(groupClone)
    //                                     mainModel.remove(component)
    //                                     mainModel.add(groupClone)
    //                                 } else {
    //                                     const clone = component.clone()
    //                                     clone.material = obj.children[0].material
    //                                     bodyColoredComponents.push(clone)
    //                                     mainModel.remove(component)
    //                                     mainModel.add(clone)
    //                                     return
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 console.log(bodyColoredComponents);
    //                 for (const obj of mainModel.children) {
    //                     if (obj.name === 'Body') {
    //                         for (const component of bodyColoredComponents) {
    //                             if (component.name === selectedComponent.name) {
    //                                 if (selectedComponent.name === 'Mirrors') {
    //                                     component.children[1].material = obj.children[3].material
    //                                 } else {
    //                                     component.material = obj.children[3].material
    //                                     bodyColoredComponents.splice(component)
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         })
    //     }
    })
}

    

function changeComponent(componentOption, mainModel, scene) {

    // if (componentOption.name === 'Mirrors') {
    //     if (document.getElementById('secondaryOptionCheckBox').checked) {
    //         return
    //     }
    // } 
    // if (componentOption.userData.bodyColor === 'true') {
    //     if (document.getElementById('secondaryOptionCheckBox').checked) {
    //         return
    //     }
    
    // }

    for (const component of mainModel.children) {
        if (component.name === componentOption.name) {

            // Checks if Body is changed and changes air ducts
            // if (componentOption.name === 'Body') {
            //     for (const obj of mainModel.children) {
            //         if (obj.userData.isBodyColor === 'true') {
            //             obj.material = componentOption.children[0].material
            //         }
            //     }
            //     // for (const component of bodyColoredComponents) {
            //     //     component.material = componentOption.children[0].material
            //     // }
            // }


            mainModel.remove(component)
            mainModel.add(componentOption)

            if (componentOption.name === 'Body') {
                for (const obj of mainModel.children) {
                    if (obj.userData.isBodyColor === 'true') {
                            obj.material = componentOption.children[0].material
                        }
                    }
            }


            // Checks if stripes are checked off and removes stripes
            if (!stripesToggle.checked) {
                for (const obj of mainModel.children) {
                    if (obj.name === 'Body') {
                        obj.children[1].material = obj.children[0].material
                    }
                }
            } else if (stripesToggle.checked) {
                for (const obj of mainModel.children) {
                    if (obj.name === 'Body') {
                        obj.children[1].material = currentStripe
                    }
                }
            }

            updateAllMaterials(scene)
        
        }
    }
}



// function to remove dom elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}





// Generate Menu for all Options
function displayOptions(mainModel, allModels, outlinePass, camera, scene) {
    removeAllChildNodes(options)
    let condition
    allModels.then(result => {
        for (const component of result[0].components) {
            if (component.type === 'Group') {
                condition = component.children[0].userData.isEditable
            } else {
                condition = component.userData.isEditable
            }
            if (condition === 'true') {
                const componentCard = document.createElement('div')
                componentCard.setAttribute('id', 'componentCard')
                const cardName = document.createElement('h3')
                cardName.setAttribute('id', 'cardName')
                const cardImg = document.createElement('img')
                cardImg.setAttribute('id', 'cardImg')                
        
                if (component.type === 'Group') {
                    cardName.innerHTML = component.children[0].userData.componentType
                    for (const img of result[0].images) {
                       if (img.name === component.children[0].userData.componentType) {
                        cardImg.setAttribute('src', `${img.image}`)
                       }
                    }
                } else {
                    cardName.innerHTML = component.userData.componentType
                    for (const img of result[0].images) {
                        if (img.name === component.userData.componentType && img.material === 'Standard') {
                         cardImg.setAttribute('src', `${img.image}`)
                        }
                     }
                }  
                componentCard.appendChild(cardImg)
                componentCard.appendChild(cardName)
                options.appendChild(componentCard) 
                componentCard.addEventListener('mouseover', () => {
                    focusOnComponent(component, outlinePass, camera)
                })   
                componentCard.addEventListener('click', () => {
                    removeAllChildNodes(options)
                    getOptions(component, allModels, mainModel, scene)
                    outlinePass.selectedObjects = []
                })
            }
        }
    })
}



// focus on component
function focusOnComponent(component, outlinePass, camera) {
    // outlinePass.selectedObjects = [component]
    switch (component.name) {
        case 'Rear_Bumper':
        panCamera(camera, 5, 1, -2)
        break;
        case 'Body':
        panCamera(camera, 0, 1.5, 6)
        break;
        case 'Door_Air_Duct':
        panCamera(camera, 2, 2, 4)
        break;
        case 'Upper_Air_Duct':
        panCamera(camera, 2, 2, 4)
        break;
        case 'Window_Frames':
        panCamera(camera, -3, 3, -0.5)
        break;
        case 'Rear_Fog_Light_Socket':
        panCamera(camera, 3.2, 0.6, -1)
        break;
        case 'Mirrors':
        panCamera(camera, 0, 2, 3)
        break;
        case 'Front_Bumper':
        panCamera(camera, -1, 1, 5)
        break;
        case 'Rear_badge':
        panCamera(camera, 2.2, 1, -3)
        break;
        case 'Wheel_Type_1':
        panCamera(camera, 0, 0.3, 3.5)
        break;
        case 'Brake_Lights_Frame':
        panCamera(camera, 4, 1.6, -1.7)
        break;
    
        default:
            break;
    }
}

// Pans camera to gven coordinates
function panCamera(camera, xCord, yCord, zCord) {
    const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z  };
    new TWEEN.Tween(coords)
    .to({ x: xCord, y: yCord, z: zCord })
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() =>
        camera.position.set(coords.x, coords.y, coords.z)
    )
    .start();
}

// animation function
function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
}
requestAnimationFrame(animate)



