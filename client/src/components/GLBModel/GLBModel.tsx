import React, {Suspense, useRef, HTMLAttributes} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {
    onLoad: (meshRef: React.MutableRefObject<THREE.Mesh>) => void,
    filePath: string,
    scale: number[],
    rotation: number[],
    position: number[],
    ref: React.Ref<THREE.Mesh>
} & HTMLAttributes<THREE.Mesh>;

const GLBModel: React.FC<Props> = (props: Props) => {
    const glbRef = useRef<THREE.Mesh>(null!);
    const glb = useLoader(GLTFLoader, props.filePath);
    const mixer = new THREE.AnimationMixer(glb.scene);
    const clips = glb.animations;
    if (glbRef) props.onLoad(glbRef)
    if (clips && clips.length) {
        const action = mixer.clipAction(clips[0]);
        action.play();
        console.log(action);
    }
    useFrame((state, delta) => {
        mixer.update(delta / 10);
    });
    console.log(glb);
  
    return (
        <Suspense fallback={null}>
            <primitive 
                object={glb.scene} 
                scale={props.scale}
                position={props.position}
                rotation={props.rotation}
                ref={glbRef}
            />
        </Suspense>
    );
};

export default GLBModel;