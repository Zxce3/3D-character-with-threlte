<script lang="ts">
    import { Pane, Button } from 'svelte-tweakpane-ui'
    import { Canvas } from '@threlte/core'
    import Scene from '$lib/components/Scene.svelte'
    import type { CharacterActions } from '$lib/types'
    
    let action: CharacterActions = $state('idle')

    const ACTIONS = {
        locomotion: ['idle', 'walk', 'run', 'sneak_pose'],
        emotions: ['agree', 'headShake', 'sad_pose']
    } as const;
</script>

<Pane
    title="Character Actions"
    position="fixed"
>
    {#each Object.entries(ACTIONS) as [category, actions]}
        <div class="category">
            <h3>{category}</h3>
            {#each actions as actionName}
                <Button
                    title={actionName}
                    on:click={() => {
                        action = actionName as CharacterActions;
                    }}
                />
            {/each}
        </div>
    {/each}
</Pane>

<div>
    <Canvas>
        <Scene {action} />
    </Canvas>
</div>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #001529;
    }

    .category {
        margin: 8px 0;
    }
    .category h3 {
        text-transform: capitalize;
        margin: 4px 0;
    }
</style>
