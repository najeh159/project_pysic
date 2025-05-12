'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

function Sun() {
  const sunTexture = useLoader(THREE.TextureLoader, '/textures/2k_sun.jpg');
  return (
    <Sphere position={[0, 0, 0]} args={[1.8, 64, 64]} castShadow receiveShadow>
      <meshStandardMaterial map={sunTexture} emissive="orange" emissiveIntensity={2} />
      <Html center position={[0, 2.2, 0]}>
        <div style={{ color: 'rgb(0,0,0)', fontSize: '14px' }}>الشمس</div>
      </Html>
    </Sphere>
  );
}

function Earth() {
  const earthTexture = useLoader(THREE.TextureLoader, '/textures/earthmap1k.jpg');
  return (
    <Sphere position={[5, 0, 0]} args={[0.6, 64, 64]} castShadow receiveShadow>
      <meshStandardMaterial map={earthTexture} />
      <Html center position={[0, 1, 0]}>
        <div style={{ color: 'white', fontSize: '12px' }}>الأرض</div>
      </Html>
    </Sphere>
  );
}

function Moon({ position }) {
  const moonTexture = useLoader(THREE.TextureLoader, '/textures/2k_moon.jpg');
  return (
    <Sphere position={position} args={[0.2, 32, 32]} castShadow receiveShadow>
      <meshStandardMaterial map={moonTexture} />
      <Html center position={[0, 0.5, 0]}>
        <div style={{ color: 'white', fontSize: '10px' }}>القمر</div>
      </Html>
    </Sphere>
  );
}

export default function Hom2() {
  const [isKousouf, setIsKousouf] = useState(true);

  return (
    <><div style={{
      position: 'relative',
      width: '100%',
      height: '100vh'}}>
        <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024} />
          <OrbitControls />
          <Sun />
          <Earth />
          {isKousouf ? (
            <Moon position={[4, 0, 0]} /> // Moon between Sun and Earth (solar eclipse)
          ) : (
            <Moon position={[6, 0, 0]} /> // Moon behind Earth (lunar eclipse)
          )}
        </Canvas>

        {/* Project info overlay */}
        

        {/* Toggle button */}
        <button
          onClick={() => setIsKousouf(!isKousouf)}
          style={{
            position: 'absolute',
            bottom: "7.5vh",
            left: 20,
            padding: '10px 20px',
            backgroundColor: 'white',
            color: 'black',
            border: 'white solid 1px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          تبديل إلى {isKousouf ? 'الخُسوف' : 'الكُسوف'}
        </button>
        {/* Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/textures/space_background.jpg)',
          backgroundSize: 'cover',
          opacity: 0.5,
          zIndex: -1
        }}></div>
        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: 5,
          left: 0,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          padding: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          مشروع محاكاة {isKousouf ? 'كُسوف' : 'خُسوف'} القمر
          <br />
        </div>
      </div></>
  );
}

