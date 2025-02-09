import type { CharacterActions } from '../types'

interface AnimationMessage {
    type: 'ANIMATION_TRANSITION';
    payload: {
        currentAction: string;
        nextAction: CharacterActions;
        duration: number;
    };
}

interface ComputeMessage {
    type: 'COMPUTE_BLEND_WEIGHTS';
    payload: {
        actions: string[];
        weights: number[];
    };
}

type WorkerMessage = AnimationMessage | ComputeMessage;

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const { type, payload } = event.data;

    switch (type) {
        case 'ANIMATION_TRANSITION':
            handleAnimationTransition(payload);
            break;
        case 'COMPUTE_BLEND_WEIGHTS':
            computeBlendWeights(payload);
            break;
    }
};

function handleAnimationTransition({ currentAction, nextAction, duration }: AnimationMessage['payload']) {
    // Compute transition parameters
    const blendFactors = calculateBlendFactors(duration);
    
    // Send back the computed transition data
    self.postMessage({
        type: 'TRANSITION_COMPLETE',
        payload: { blendFactors, nextAction }
    });
}

function computeBlendWeights({ actions, weights }: ComputeMessage['payload']) {
    // Heavy computation for animation blending
    const computedWeights = weights.map(weight => {
        // Simulate complex computation
        let result = weight;
        for (let i = 0; i < 1000; i++) {
            result = Math.sin(result) * Math.cos(result);
        }
        return result;
    });

    self.postMessage({
        type: 'BLEND_WEIGHTS_COMPUTED',
        payload: { actions, weights: computedWeights }
    });
}

function calculateBlendFactors(duration: number): number[] {
    const steps = Math.floor(duration * 60); // 60fps
    const factors = new Array(steps);
    
    for (let i = 0; i < steps; i++) {
        factors[i] = Math.pow(i / steps, 2);
    }
    
    return factors;
}

export {};
