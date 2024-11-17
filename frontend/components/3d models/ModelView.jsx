import React from 'react'
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import { Suspense } from "react"
import Lights from './Lights'
import * as THREE from 'three'
import Model from './Vishka-animate'
const ModelView = ({ modelRef }) => {
    return (
        <View className='w-full h-full'>
            <PerspectiveCamera makeDefault position={[0, 0, 0]} />
            <Lights />
            <Suspense>
                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                />
                <group position={[0, -25, -100]} ref={modelRef} rotation={[186, 0, 0]}>
                    <Model scale={[2.2 , 2.2 , 2.2]}/>
                </group>
            </Suspense>
        </View>
    )
}

export default ModelView