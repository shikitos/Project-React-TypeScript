import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber';

type Props = {};

function Stars(props: ThreeElements["mesh"]) {
    const starRef = useRef<THREE.Points>(null!);
    
    const positions = Array.from({ length: 10000 }, (_, i) => [
        (Math.random() - 0.5) * 10000,
        (Math.random() - 0.5) * 10000,
        (Math.random() - 0.5) * 10000,
    ]);
    
    
    return (
        <points ref={starRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    count={ positions.length }
                    array={ new Float32Array(positions.flat()) }
                    itemSize={ 3 }
                />
            </bufferGeometry>
            <pointsMaterial attach="material" size={ 1.5 } sizeAttenuation color="white" />
        </points>
    )
}

const Scene = (props: Props) => {
    const { camera } = useThree();

    // Adjust the camera position and angle
    camera.position.set(0, 0, 750);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    useFrame((state, delta) => (camera.position.z -= delta * 10))
    
    return (
        <>
            {/* <gridHelper /> */}
            <ambientLight />
            <pointLight position={[ 10, 10, 10 ]} />
            <Stars />
        </>
  );
}

const SpaceCanvas = (props: Props) => {
    return (
        <Canvas
            style={{ background: 'black' }}
            flat linear
        >
            <Scene />
            
        </Canvas>
    )
}

export default SpaceCanvas;