import React, { useState, useEffect } from 'react';
import { useLoader, useGraph } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF, useAnimations } from '@react-three/drei'; // Добавили useGraph
import { SkeletonUtils } from 'three-stdlib';

// Импортируем модель
function Model(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF('/models/vishkaColor.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone); // Используем useGraph
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const animationName = 'ArmatureAction';
      const action = actions.ArmatureAction;

      // Запускаем анимацию
      action.play();
    }
  }, [actions]);

  // Загружаем текстуры
  const textureMap = useLoader(TextureLoader, '/texture.png'); // Укажите путь к вашей текстуре

  useEffect(() => {
    if (materials && textureMap) {
      materials[""].map = textureMap; // Замените 'MaterialName' на имя вашего материала
      materials[""].needsUpdate = true; // Указываем, что материал обновился
    }
  }, [materials, textureMap]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -0.406, 0]} rotation={[0, 0, -Math.PI]}>
          <primitive object={nodes.Bone} />
          <skinnedMesh name="Circle_cell010" geometry={nodes.Circle_cell010.geometry} material={nodes.Circle_cell010.material} skeleton={nodes.Circle_cell010.skeleton} />
          <skinnedMesh name="Cube" geometry={nodes.Cube.geometry} material={nodes.Cube.material} skeleton={nodes.Cube.skeleton} />
          <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} skeleton={nodes.Cube001.skeleton} />
          <skinnedMesh name="Cube002" geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} skeleton={nodes.Cube002.skeleton} />
          <skinnedMesh name="Cube003" geometry={nodes.Cube003.geometry} material={nodes.Cube003.material} skeleton={nodes.Cube003.skeleton} />
          <skinnedMesh name="Cube004" geometry={nodes.Cube004.geometry} material={nodes.Cube004.material} skeleton={nodes.Cube004.skeleton} />
          <skinnedMesh name="Cube005" geometry={nodes.Cube005.geometry} material={nodes.Cube005.material} skeleton={nodes.Cube005.skeleton} />
          <skinnedMesh name="Cube006" geometry={nodes.Cube006.geometry} material={nodes.Cube006.material} skeleton={nodes.Cube006.skeleton} />
          <skinnedMesh name="Cube007" geometry={nodes.Cube007.geometry} material={nodes.Cube007.material} skeleton={nodes.Cube007.skeleton} />
          <skinnedMesh name="Cube009" geometry={nodes.Cube009.geometry} material={nodes.Cube009.material} skeleton={nodes.Cube009.skeleton} />
          <skinnedMesh name="Cylinder" geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} skeleton={nodes.Cylinder.skeleton} />
          <skinnedMesh name="Cylinder001" geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} skeleton={nodes.Cylinder001.skeleton} />
          <skinnedMesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={nodes.Cylinder002.material} skeleton={nodes.Cylinder002.skeleton} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/vishkaColor.glb'); // Перенесли вызов preload за пределы компонента

export default Model;