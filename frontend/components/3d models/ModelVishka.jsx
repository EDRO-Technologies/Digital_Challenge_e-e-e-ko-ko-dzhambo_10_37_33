
import React, { useRef, useEffect, useState } from 'react'
import ModelView from './ModelView'
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const ModelVishka = ({}) => {
    const modelRef = useRef();
    return (
        <div className='w-full h-[75vh] overflow-hidden'>
            <ModelView modelRef={modelRef} />

            <Canvas
                className="w-full h-full pointer-events-none"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden'
                    
                }}>
                <View.Port />
            </Canvas>
        </div>
    )
}

export default ModelVishka