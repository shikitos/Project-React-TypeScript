import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLBModel, Stars } from '../';


type Props = {};
type SceneProps = {
    mousePos: { x: number, y: number }
}

const Scene = (props: SceneProps) => {
    const { camera } = useThree();
    camera.position.set(0, 0, 10000);
    camera.far = 3000;
    const initialPosition = new THREE.Vector3(0, 0, 1000);
    const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null>(null);
    let distance = 0;
    let targetQuaternion: THREE.Quaternion = new THREE.Quaternion();
    let targetPosition = new THREE.Vector3(0, 0, 0);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
    
    const handleModelLoaded = (glbRef: React.Ref<THREE.Mesh>) => {
        // Update the ref with the model
        if (glbRef.current) meshRef.current = glbRef.current;
        console.log("11111",meshRef)
        if (meshRef.current) {
            targetPosition = meshRef.current.position.clone();
            targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 0, 1),
                meshRef.current.position.clone().normalize()
            );
            distance = camera.position.distanceTo(meshRef.current.position);
            camera.lookAt(targetPosition);
        }
    };
    
    // Adjust the camera position and angle
    useFrame((state, delta) => {
        if(meshRef) {
            distance = camera.position.distanceTo(meshRef.current.position);
            if (distance > 75) {
                camera.position.lerp(targetPosition, 0.005);
            } else {
                console.log(camera.position);
                // camera.position.lerp(initialPosition, 0.05);
                // camera.quaternion.slerp(new THREE.Quaternion(), 0.05);
                camera.rotation.x = props.mousePos.x
                camera.rotation.y = props.mousePos.y
            }
        }
    })
    
    
    return (
        <>
            <ambientLight />
            <pointLight position={[ 10, 10, 10 ]} />
            <perspectiveCamera ref={cameraRef} position={[0, 0, 1000]} />
            <Stars />
            <GLBModel 
                onLoad={handleModelLoaded}
                filePath='models/black-hole/blackhole.glb'
                scale={[10, 10, 10]}
                position={[0, -10, -50]}
                rotation={[Math.PI / 20, 0, Math.PI / 20]}
                
            />
        </>
  );
}

const SpaceCanvas = (props: Props) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
        setMousePos(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
    
    return (
        <Canvas
            style={{ background: 'black' }}
            flat 
            linear
            onPointerMove={handleMouseMove}
        >
            <Scene 
                mousePos = { mousePos }
            />
            
        </Canvas>
    )
}

export default SpaceCanvas;