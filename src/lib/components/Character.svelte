<script lang="ts">
    import { GLTF, useGltfAnimations } from '@threlte/extras'
    import * as THREE from 'three'
    import type { CharacterActions } from '$lib/types'
    import { onDestroy } from 'svelte'
  
    const { actionKey } = $props<{ actionKey: CharacterActions }>()
    let { gltf, actions } = useGltfAnimations()
    let currentAction: THREE.AnimationAction | null = null
    let currentActionKey: CharacterActions = 'idle'

    // Animation configuration
    const ANIMATION_CONFIG = {
        poses: {
            'sneak_pose': { duration: 0.2, loop: THREE.LoopOnce },
            'sad_pose': { duration: 0.2, loop: THREE.LoopOnce }
        },
        default: {
            duration: 0.5,
            loop: THREE.LoopRepeat
        }
    };

    // Initialize worker
    const worker = new Worker(
        new URL('../workers/worker.ts', import.meta.url),
        { type: 'module' }
    );

    // Handle worker messages
    worker.onmessage = (event) => {
        const { type, payload } = event.data;
        switch (type) {
            case 'TRANSITION_COMPLETE':
                applyTransition(payload);
                break;
            case 'BLEND_WEIGHTS_COMPUTED':
                applyBlendWeights(payload);
                break;
        }
    };

    // Initialize default animation
    $effect(() => {
        if ($actions?.['idle']) {
            currentAction = $actions['idle']
            currentAction.play()
            currentActionKey = 'idle'
        }
    })

    // Handle animation transitions
    $effect(() => {
        if (actionKey === currentActionKey || !$actions) return;
        const nextAction = $actions[actionKey];
        if (!nextAction) return;
        transitionTo(actionKey);
    })

    function transitionTo(newActionKey: CharacterActions, duration?: number) {
        if (!$actions || newActionKey === currentActionKey) return;

        // Offload transition computation to worker
        worker.postMessage({
            type: 'ANIMATION_TRANSITION',
            payload: {
                currentAction: currentActionKey,
                nextAction: newActionKey,
                duration: duration || ANIMATION_CONFIG.default.duration
            }
        });
    }

    function applyTransition({ blendFactors, nextAction }: any) {
        if (!$actions || !currentAction) return;
        
        const next = $actions[nextAction];
        if (!next) return;

        // Apply animation transition
        next.reset();
        const config = ANIMATION_CONFIG.poses[nextAction as keyof typeof ANIMATION_CONFIG.poses] 
            || ANIMATION_CONFIG.default;
            
        next.setLoop(config.loop, Infinity);
        next.clampWhenFinished = true;
        next.enabled = true;
        next.play();
        
        currentAction.crossFadeTo(next, config.duration, true);
        currentAction = next;
        currentActionKey = nextAction;
    }

    function applyBlendWeights({ actions: actionNames, weights }: any) {
        if (!$actions) return;
        actionNames.forEach((actionName: string, index: number) => {
            const anim = $actions[actionName];
            if (anim) {
                anim.setEffectiveWeight(weights[index]);
            }
        });
    }

    // Cleanup
    onDestroy(() => {
        worker.terminate();
        if (currentAction) {
            currentAction.stop();
        }
        if ($actions) {
            Object.values($actions).forEach(action => {
                if (action) action.stop();
            });
        }
    });
</script>
  
<GLTF
    bind:gltf={$gltf}
    url="https://threejs.org/examples/models/gltf/Xbot.glb"
    position.y={0}
    scale={1}
    castShadow
    receiveShadow
    shadows={{
        castShadow: true,
        receiveShadow: true,
        shadowBias: -0.0001,
        shadowNormalBias: 0.02
    }}
/>
