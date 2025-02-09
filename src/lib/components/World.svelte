<script lang="ts">
    import { T } from '@threlte/core'
    import { Environment, Sky } from '@threlte/extras'
    
    // Time-based sky configuration
    const now = new Date()
    const hours = now.getHours()
    const timeOfDay = hours / 24
    
    // Sky parameters based on time
    const skyParams = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        inclination: timeOfDay, // 0-1, 0.5 is noon
        azimuth: 0.25,
    }

    // Choose HDR map based on time
    const envMap = hours >= 18 || hours <= 6 
        ? "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr"
        : "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/sunny_vondelpark_1k.hdr"
</script>

<Sky {...skyParams} />
<Environment 
    url={envMap}
/>

<T.Fog attach="fog" color={hours >= 18 || hours <= 6 ? "#001529" : "#90a4ae"} near={1} far={30} />

<!-- Main directional light (sun/moon) -->
<T.DirectionalLight
    castShadow
    position={[5, 15, 5]}
    intensity={hours >= 18 || hours <= 6 ? 0.1 : 1}
    color={hours >= 18 || hours <= 6 ? "#b6cff7" : "#ffffff"}
    shadow-mapSize={[4096, 4096]}
    shadow-bias={-0.001}
    shadow-radius={5}
>
    <T.OrthographicCamera
        attach="shadow-camera"
        args={[-15, 15, 15, -15, 0.1, 35]}
    />
</T.DirectionalLight>

<!-- Ambient lighting -->
<T.AmbientLight 
    intensity={hours >= 18 || hours <= 6 ? 0.05 : 0.3} 
    color={hours >= 18 || hours <= 6 ? "#001529" : "#ffffff"}
/>

<!-- Fill light for shadows -->
<T.HemisphereLight
    intensity={hours >= 18 || hours <= 6 ? 0.1 : 0.5}
    color={hours >= 18 || hours <= 6 ? "#0e264f" : "#ffffff"}
    groundColor={hours >= 18 || hours <= 6 ? "#000066" : "#8d6e63"}
/>

<!-- Add shadow spot light -->
<T.SpotLight
    position={[2, 10, 2]}
    intensity={0.2}
    castShadow
    shadow-bias={-0.0001}
    penumbra={1}
    angle={Math.PI / 4}
/>
