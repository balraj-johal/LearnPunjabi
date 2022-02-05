import React, { useState, useEffect } from "react";

// Three.js imports
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import punjabGLTF from "../res/models/Punjab.glb";
import { Vector3 } from "three";

function Welcome(props) {
    useEffect(() => {
        // config variables
        let container;
        let camera, scene, renderer;
        let mouseX, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        // add THREE div to DOM
        container = document.createElement('div');
        let root = document.getElementById("welcome"); //TODO
        root.appendChild( container );

        // SET CAMERA
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.y = 10;
        camera.position.z = 30;

        // scene setup
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer( { 
            antialias: true, 
            precision: "lowp" 
        } );
        renderer.setClearColor( 0x000000, 0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container.appendChild( renderer.domElement );

        // post processing effects
        const composer = new EffectComposer( renderer );

        const renderPass = new RenderPass( scene, camera );
        composer.addPass( renderPass );

        container.style.touchAction = 'none';
        container.addEventListener( 'pointermove', ( event ) => {
            if ( event.isPrimary === false ) return;
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        } );

        window.addEventListener( 'resize', () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
    
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
    
            renderer.setSize( window.innerWidth, window.innerHeight );
    
        } );

        let mx = 0;
        let degree = 0;
        let clock = new THREE.Clock();
        let delta = 0;


        
        // add torus
        const TORUS_GEOMETRY = new THREE.TorusGeometry( 10, 3, 14, 100 );
        const TORUS_MATERIAL = new THREE.MeshStandardMaterial({color: 0xFF6347});
        const TORUS_MESH = new THREE.Mesh(TORUS_GEOMETRY, TORUS_MATERIAL);
        // scene.add(TORUS_MESH);

        // add punjab mesh
        let punjabMesh;
        const loader = new GLTFLoader();
        // loader.setDRACOLoader( dracoLoader ) // add middleware to decompress mesh data
        loader.load(
            punjabGLTF,
            // "../res/models/untitled.glb",
            (gltf) => {
                punjabMesh = gltf;
                scene.add(punjabMesh.scene);
                punjabMesh.scene.position.set(0,0,0);
                punjabMesh.scene.scale.set(50,50,50);
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened ', error );
            }
        )

        // 60 fps
        let interval = 1 / 60;
        animate();

        function animate() {
            requestAnimationFrame( animate );
            delta += clock.getDelta();
            // if it's time to draw the next frame
            if (delta  > interval) {
                // if the page is visible
                if (!document.hidden) {
                    render();
                }
         
                delta = delta % interval;
            }
        }

        function render() {
            mx += 0.8;
            degree += 0.01;
            if (punjabMesh) {
                punjabMesh.scene.rotation.y += 0.001;
            }
            composer.render();
        }

        return () => {
        }
    }, [])

    return(
        <div id="welcome">
        </div>
    )
}

export default Welcome;