import React from 'react'
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import { Suspense } from "react"
import Model from './Vishka-animate'
import Vishka from './Vishka'
import Lights from './Lights'
import * as THREE from 'three'
const ModelView = ({ modelRef }) => {
    return (
        <View className='w-full h-full'>
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 0]} />
            <Lights />
            <Suspense>
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                />
                <group position={[0, -30, -100]} ref={modelRef} rotation={[186, 0, 0]}>
                    <Model scale={[2.5 , 2.5 , 2.5]}/>
                </group>
            </Suspense>
        </View>
    )
}

export default ModelView