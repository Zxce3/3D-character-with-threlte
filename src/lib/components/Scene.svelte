<script lang="ts">
    import { T } from '@threlte/core'
    import { interactivity } from '@threlte/extras'
    import Character from '$lib/components/Character.svelte'
    import type { CharacterActions } from '$lib/types'
    import World from './World.svelte'
    import Ground from './Ground.svelte'
  
    export let action: CharacterActions;
    interactivity()
</script>
  
<T.PerspectiveCamera
    makeDefault
    position={[-0.85, 1.75, 2.46]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0)
    }}
/>

<World />
<Character actionKey={action as CharacterActions} />
<Ground />
