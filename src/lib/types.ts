export type CharacterActions =
    // Locomotion
    | 'idle'
    | 'walk'
    | 'run'
    | 'sneak_pose'
    
    // Emotions & Gestures
    | 'agree'
    | 'headShake'
    | 'sad_pose';

import type { PerspectiveCamera, OrthographicCamera } from 'three'

export type Camera = OrthographicCamera | PerspectiveCamera
