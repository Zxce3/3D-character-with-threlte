<script>
    import { T } from '@threlte/core'
    import * as THREE from 'three'
</script>

<!-- Main ground mesh -->
<T.Mesh 
    rotation.x={-90 * (Math.PI / 180)} 
    receiveShadow
>
    <T.CircleGeometry args={[20, 64]} />
    <T.MeshStandardMaterial 
        color="#0a1f3d"
        metalness={0.2}
        roughness={0.8}
        emissive="#001529"
        emissiveIntensity={0.05}
        aoMapIntensity={1}
        envMapIntensity={0.5}
        depthWrite={true}
    />
</T.Mesh>

<!-- Shadow catcher with reflection -->
<T.Mesh 
    rotation.x={-90 * (Math.PI / 180)}
    position.y={0.01}
    receiveShadow
>
    <T.CircleGeometry args={[20, 64]} />
    <T.MeshStandardMaterial 
        color="#000000"
        metalness={0}
        roughness={0}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.MultiplyBlending}
    />
</T.Mesh>

<!-- Additional reflection plane -->
<T.Mesh
    rotation.x={-90 * (Math.PI / 180)}
    position.y={0.02}
>
    <T.CircleGeometry args={[20, 64]} />
    <T.MeshPhysicalMaterial
        color="#0a1f3d"
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={1}
        opacity={0.2}
        transparent
        side={THREE.FrontSide}
    />
</T.Mesh>
