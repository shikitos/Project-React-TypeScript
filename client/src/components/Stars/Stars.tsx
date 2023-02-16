import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';


function Stars(props: ThreeElements["mesh"]) {
    const starRef = useRef<THREE.Points>(null!);
    
    const positions = Array.from({ length: 200000 }, (_, i) => [
        (Math.random() - 0.5) * 20000,
        (Math.random() - 0.5) * 20000,
        (Math.random() - 0.5) * 40000,
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
            <pointsMaterial attach="material" size={ 1 } sizeAttenuation color="white" />
        </points>
    )
}

export default Stars;