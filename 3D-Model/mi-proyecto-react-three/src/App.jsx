import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSG } from 'three-csg-ts';
function App() {
  const mountRef = useRef(null);
  useEffect(() => {
    //DECLARACIÓN DEL RENDERER Y LA CÁMARA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    //CREACIÓN DEL CASCO 1/3
    const CylinderGeometry = new THREE.CylinderGeometry(1.5, 3, 3, 20, 20, false);
    const CylinderMaterial = new THREE.MeshNormalMaterial({
      color: 0xaaa9a9,
      side: THREE.DoubleSide,
      clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
      clipShadows: true,
    });
    const CylinderMesh = new THREE.Mesh(CylinderGeometry, CylinderMaterial);
    //CREACIÓN DEL CASCO 2/3
    const BoxGeometry = new THREE.BoxGeometry(2, 0.6, 0.6);
    const BoxMaterial = new THREE.MeshNormalMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    const BoxMesh = new THREE.Mesh(BoxGeometry, BoxMaterial);
    //CORTE DE AMBAS GEOMETRÍAS
    BoxMesh.position.set(0, 19, 2.15); //POSICIÓN DE LA MESH DEL CUBO
    CylinderMesh.position.set(0, 19, 0); //POSICIÓN DE LA MESH DEL CILINDRO
    CylinderMesh.updateMatrixWorld(); //ACTUALIZACIÓN DE LAS MATRIZES DEL MUNDO DEL CUBO
    BoxMesh.updateMatrixWorld(); //ACTUALIZACIÓN DE LAS MATRIZES DEL MUNDO DEL CILINDRO
    const helmet = CSG.subtract(CylinderMesh, BoxMesh); //CORTE DE LAS MESH DE LAS GEOMETRÍAS
    scene.add(helmet);
    //CREACIÓN DEL CASCO 3/3
    const Left_Eye = new THREE.SphereGeometry(0.2, 20, 20);
    const Right_Eye = new THREE.SphereGeometry(0.2, 20, 20);
    const Eyes_Material = new THREE.MeshBasicMaterial({
      color: 0xda1414,
      side: THREE.DoubleSide,
    });
    const Left_Eye_Mesh = new THREE.Mesh(Left_Eye, Eyes_Material);
    const Right_Eye_Mesh = new THREE.Mesh(Right_Eye, Eyes_Material);
    Left_Eye_Mesh.position.set(-0.7, 19, 1.90); //POSICIÓN DE LA MESH DEL OJO DERECHO
    Right_Eye_Mesh.position.set(0.7, 19, 1.90); //POSICIÓN DE LA MESH DEL OJO IZQUIERDO
    scene.add(Left_Eye_Mesh, Right_Eye_Mesh);
    Left_Eye_Mesh.visible = false;
    Right_Eye_Mesh.visible = false;
    //CREACIÓN DEL CUELLO
    const NeckCylinderGeometry = new THREE.CylinderGeometry(2, 2, 1.25 ,20, 20, false );
    const NeckCylinderMaterial = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
      clipShadows: true,
    });
    const NeckCylinderMesh = new THREE.Mesh(NeckCylinderGeometry, NeckCylinderMaterial);
    NeckCylinderMesh.position.set(0, 17.65, 0)
    scene.add(NeckCylinderMesh);
    //CREACIÓN DEL TORSO 1/18
    const ChestBoxGeometry = new THREE.BoxGeometry(12, 12, 5);
    const ChestBoxMaterial = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
      clipShadows: true,
    });
    const ChestBoxMesh = new THREE.Mesh(ChestBoxGeometry, ChestBoxMaterial);
    ChestBoxMesh.position.set(0, 11, 0);
    ChestBoxMesh.updateMatrixWorld();
    //CREACIÓN DEL TORSO 2/18
    const ChestBoxGeometryCut = new THREE.BoxGeometry(9, 5, 5);
    const ChestBoxMaterialCut = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      color: 0x000000,
    });
    const ChestBoxMeshCut = new THREE.Mesh(ChestBoxGeometryCut, ChestBoxMaterialCut);
    ChestBoxGeometryCut.rotateZ(-80); //ROTACIÓN EN EL EJEZ DE LA GEOMETRÍA
    ChestBoxMeshCut.position.set(-6.5, 9, 0); //POSICIÓN DE LA GEOMETRÍA
    ChestBoxMeshCut.updateMatrixWorld(); //ACTUALIZACIÓN DE LA MATRIZ DE LA GEOMETRÍA
    const Cut1 = CSG.subtract(ChestBoxMesh, ChestBoxMeshCut); //PRIMER CORTE PARA HACER LA FORMA
    //CREACIÓN DEL TORSO 3/18
    const ChestBoxGeometryCut2 = new THREE.BoxGeometry(9, 5, 5);
    const ChestBoxMaterialCut2 = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      color: 0x000000,
    });
    const ChestBoxMeshCut2 = new THREE.Mesh(ChestBoxGeometryCut2, ChestBoxMaterialCut2);
    ChestBoxGeometryCut2.rotateZ(80); //ROTACIÓN EN EL EJEZ DE LA GEOMETRÍA
    ChestBoxMeshCut2.position.set(6.5, 9, 0); //POSICIÓN DE LA GEOMETRÍA
    ChestBoxMeshCut2.updateMatrixWorld(); //ACTUALIZACIÓN DE LA MATRIZ DE LA GEOMETRÍA
    const Torso = CSG.subtract(Cut1, ChestBoxMeshCut2); //SEGUNDO CORTE PARA TERMINAR EL TORSO
    //CREACIÓN DEL TORSO 4/18
     const CapsuleGeometryCut1 = new THREE.CapsuleGeometry(1.3, 5, 20, 20);
     const CapsuleMaterialCut1 = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
     });
     const CapsuleMeshCut1 = new THREE.Mesh(CapsuleGeometryCut1, CapsuleMaterialCut1);
     CapsuleMeshCut1.position.set(-5.7, 14, 0); //POSICIÓN DEL PRIMER CORTE
     CapsuleMeshCut1.rotateX(Math.PI / 2); //ROTACIÓN DE 90º
     CapsuleMeshCut1.updateMatrixWorld(); //ACTUALIZACIÓN DE LA MATRIX DE LA GEOMETRIA
     //CREACIÓN DEL TORSO 5/18
     const CapsuleGeometryCut2 = new THREE.CapsuleGeometry(1.3, 5, 20, 20);
     const CapsuleMaterialCut2 = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
     });
     const CapsuleMeshCut2 = new THREE.Mesh(CapsuleGeometryCut2, CapsuleMaterialCut2);
     CapsuleMeshCut2.position.set(5.7, 14, 0); //POSICIÓN DEL SEGUNDO CORTE
     CapsuleMeshCut2.rotateX(Math.PI / 2); //ROTACIÓN DE 90º
     CapsuleMeshCut2.updateMatrixWorld(); //ACTUALIZACIÓN DE LA MATRIX DE LA GEOMETRIA
     //CREACIÓN DEL TORSO 6/18 (CORTES)
     const chestCut1 = CSG.subtract(Torso, CapsuleMeshCut1); //CORTE 1
     const chestCut2 = CSG.subtract(chestCut1, CapsuleMeshCut2); //CORTE 2
     scene.add(chestCut2);
       //CREACIÓN DEL TORSO 7/18 (PECTORAL)
       const ChestCylinderDetailGeometry = new THREE.CylinderGeometry(2, 1.5, 1.5, 20, 20, false, 4, 3.1);
       const ChestCylinderDetailMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
       });
       const ChestCylinderDetailMesh = new THREE.Mesh(ChestCylinderDetailGeometry, ChestCylinderDetailMaterial);
       ChestCylinderDetailMesh.position.set(2.25, 15, 1.4);
       ChestCylinderDetailMesh.rotateY(Math.PI / 4.5)
       ChestCylinderDetailMesh.updateMatrixWorld();
       //CREACIÓN DEL TORSO 8/18 (PECTORAL)
       const ChestCylinderDetailGeometry2 = new THREE.CylinderGeometry(2, 1.5, 1.5, 20, 20, false, 4, 3.1);
       const ChestCylinderDetailMaterial2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
       });
       const ChestCylinderDetailMesh2 = new THREE.Mesh(ChestCylinderDetailGeometry2, ChestCylinderDetailMaterial2);
       ChestCylinderDetailMesh2.position.set(-2.25, 15, 1.4);
       ChestCylinderDetailMesh2.rotateY(Math.PI / 4.5)
       ChestCylinderDetailMesh2.updateMatrixWorld();
       scene.add(ChestCylinderDetailMesh, ChestCylinderDetailMesh2);
       //CREACIÓN DEL TORSO 9/18 (AB1)
       const ChestCapsuleDetailGeometry = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
       const ChestCapsuleDetailMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
       });
       const ChestCapsuleDetailMesh = new THREE.Mesh(ChestCapsuleDetailGeometry, ChestCapsuleDetailMaterial);
       ChestCapsuleDetailMesh.rotateZ(Math.PI / 2);
       ChestCapsuleDetailMesh.position.set(-1.7, 12.7, 2.1);
       ChestCapsuleDetailMesh.updateMatrixWorld();
       scene.add(ChestCapsuleDetailMesh);
       //CREACIÓN DEL TORSO 10/18 (AB2)
        const ChestCapsuleDetailGeometry2 = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
        const ChestCapsuleDetailMaterial2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
        });
        const ChestCapsuleDetailMesh2 = new THREE.Mesh(ChestCapsuleDetailGeometry2, ChestCapsuleDetailMaterial2);
        ChestCapsuleDetailMesh2.rotateZ(Math.PI / 2);
        ChestCapsuleDetailMesh2.position.set(1.7, 12.7, 2.1);
        ChestCapsuleDetailMesh2.updateMatrixWorld();
        scene.add(ChestCapsuleDetailMesh2);
       //CREACIÓN DEL TORSO 11/18 (AB3)
       const ChestCapsuleDetailGeometry3 = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
       const ChestCapsuleDetailMaterial3 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
       });
       const ChestCapsuleDetailMesh3 = new THREE.Mesh(ChestCapsuleDetailGeometry3, ChestCapsuleDetailMaterial3);
       ChestCapsuleDetailMesh3.rotateZ(Math.PI / 2);
       ChestCapsuleDetailMesh3.position.set(-1.7, 10.7, 2.1);
       ChestCapsuleDetailMesh3.updateMatrixWorld();
       scene.add(ChestCapsuleDetailMesh3);
       //CREACIÓN DEL TORSO 12/18 (AB4)
        const ChestCapsuleDetailGeometry4 = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
        const ChestCapsuleDetailMaterial4 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
        });
        const ChestCapsuleDetailMesh4 = new THREE.Mesh(ChestCapsuleDetailGeometry4, ChestCapsuleDetailMaterial4);
        ChestCapsuleDetailMesh4.rotateZ(Math.PI / 2);
        ChestCapsuleDetailMesh4.position.set(1.7, 10.7, 2.1);
        ChestCapsuleDetailMesh4.updateMatrixWorld();
        scene.add(ChestCapsuleDetailMesh4);
       //CREACIÓN DEL TORSO 13/19 (AB3)
       const ChestCapsuleDetailGeometry5 = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
       const ChestCapsuleDetailMaterial5 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xf6d502,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
        clipShadows: true,
       });
       const ChestCapsuleDetailMesh5 = new THREE.Mesh(ChestCapsuleDetailGeometry5, ChestCapsuleDetailMaterial5);
       ChestCapsuleDetailMesh5.rotateZ(Math.PI / 2);
       ChestCapsuleDetailMesh5.position.set(-1.7, 8.7, 2.1);
       ChestCapsuleDetailMesh5.updateMatrixWorld();
       scene.add(ChestCapsuleDetailMesh5);
       //CREACIÓN DEL TORSO 14/19 (AB4)
        const ChestCapsuleDetailGeometry6 = new THREE.CapsuleGeometry(1, 0.8, 20, 20);
        const ChestCapsuleDetailMaterial6 = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          color: 0xf6d502,
          clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)],
          clipShadows: true,
        });
        const ChestCapsuleDetailMesh6 = new THREE.Mesh(ChestCapsuleDetailGeometry6, ChestCapsuleDetailMaterial6);
        ChestCapsuleDetailMesh6.rotateZ(Math.PI / 2);
        ChestCapsuleDetailMesh6.position.set(1.7, 8.7, 2.1);
        ChestCapsuleDetailMesh6.updateMatrixWorld();
        scene.add(ChestCapsuleDetailMesh6);

      //GENERADOR DE GRID DE UBICACIÓN E IDENTIFICADOR DE EJES
      const grid = new THREE.GridHelper(100, 100);
      const axis = new THREE.AxesHelper(3);
      axis.position.x = 2;
      axis.position.y = 1;
      axis.position.z = 2;
      scene.add(grid, axis);
      //POSICIÓN DE LA CÁMARA
      camera.position.z = 8;
      camera.position.x = 0;
      camera.position.y = 15;
    //ÓRBIT DE LA CÁMARA
     const controls = new OrbitControls(camera, renderer.domElement);
     controls.enableDampling = true;
     controls.dampingFactor = 0.05;
     controls.enableZoom = true;
     controls.autoRotate = false;
     controls.enableRotate = true;
     controls.update();
    //RENDERIZADO DE LA ESCENA Y CÁMARA
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // NECESARIO PARA APLICAR EL DAMPING DE ORBITCONTROLS
      renderer.render(scene, camera);
    };
    animate();
    //f6d502
    //FUNCIÓN PARA HACER LOS OJOS APARECER
    const raycast = new THREE.Raycaster(); //CREACIÓN DE UN RAYCAST
    const mouse = new THREE.Vector2(); //CREACIÓN DE UN DETECTOR DEL MOUSE
    let ClickCounter = 0; //MEDIDOR DE CLICKS
    //Función para detección de clicks
    function onMouseClick(Event) {
      mouse.x = (Event.clientX / window.innerWidth) * 2 - 1; //DETECCIÓN DE MOVIMIENTO DEL MOUSE EN X
      mouse.y = -(Event.clientY / window.innerHeight) * 2 + 1; //DETECCIÓN DE MOVIMIENTO DEL MOUSE EN Y
      raycast.setFromCamera(mouse, camera);
      const intersects = raycast.intersectObject(helmet); //INDICACIÓN DEL OBJETO AL QUE SE LE PONE EL RAYCAST
      //Comparación de cicks para hacer aparecer los ojos
      if (intersects.length > 0){
        ClickCounter++;
        if (ClickCounter === 5){
          Left_Eye_Mesh.visible = true;
          Right_Eye_Mesh.visible = true;
        } else if (ClickCounter === 7){
          Left_Eye_Mesh.visible = false;
          Right_Eye_Mesh.visible = false;
          ClickCounter = 0; //RESETEO DEL CLICKCOUNTER
        }
      }
    };
    window.addEventListener("click", onMouseClick); //AÑADE EL EVENTO ONMOUSECLICK
    // LIMPIA LA ESCENA AL DEMOSTRARNOS EL COMPONENTE
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // Devolver un div sin usar JSX
  return React.createElement('div', { ref: mountRef });
}

export default App;
