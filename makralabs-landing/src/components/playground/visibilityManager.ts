/**
 * Visibility state management for form elements
 * 
 * This system manages the visibility of individual form elements
 * with calculated timestamps for pop in/out animations.
 */

// Total transition time in seconds
export const TOTAL_TRANSITION_TIME = 0.6;
export const HALF_TRANSITION_TIME = TOTAL_TRANSITION_TIME / 2;

/**
 * Visibility state type for form elements
 */
export type VisibilityState = {
  [key: string]: boolean;
};

/**
 * Calculate average time per element
 */
export function calculateAverageTimePerElement(elementCount: number): number {
  if (elementCount === 0) return 0;
  return TOTAL_TRANSITION_TIME / elementCount;
}

/**
 * Calculate timestamp for element at index
 */
export function calculateElementTimestamp(index: number, elementCount: number): number {
  const avgTime = calculateAverageTimePerElement(elementCount);
  return avgTime * index;
}

/**
 * Update visibility state for elements with staggered timing
 * @param elementKeys - Array of element keys to update
 * @param targetVisibility - Target visibility state (true = visible, false = hidden)
 * @param onUpdate - Callback called for each element update
 * @param onComplete - Callback called when all updates are complete
 */
export function updateVisibilityWithStagger(
  elementKeys: string[],
  targetVisibility: boolean,
  onUpdate: (key: string, visible: boolean) => void,
  onComplete?: () => void
): () => void {
  const elementCount = elementKeys.length;
  const avgTime = calculateAverageTimePerElement(elementCount);
  const timeouts: NodeJS.Timeout[] = [];

  // Update elements in forward order (top to bottom) for both showing and hiding
  const orderedKeys = [...elementKeys]; // Always forward order

  orderedKeys.forEach((key, index) => {
    const timestamp = avgTime * index;
    const timeout = setTimeout(() => {
      onUpdate(key, targetVisibility);
      
      // Call onComplete after the last element
      if (index === orderedKeys.length - 1 && onComplete) {
        setTimeout(onComplete, avgTime);
      }
    }, timestamp * 1000);
    
    timeouts.push(timeout);
  });

  // Return cleanup function
  return () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
}

/**
 * Create initial visibility state for form elements
 */
export function createInitialVisibilityState(keys: string[], initialVisible: boolean = true): VisibilityState {
  const state: VisibilityState = {};
  keys.forEach(key => {
    state[key] = initialVisible;
  });
  return state;
}
