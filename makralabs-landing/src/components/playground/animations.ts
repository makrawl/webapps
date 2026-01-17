/**
 * Animation constants for form transitions
 * 
 * These constants control the timing and behavior of animations throughout
 * the QueryForm and its child components. Adjust these values to change
 * the overall animation speed and feel.
 */

// Total transition time in seconds
export const TOTAL_TRANSITION_TIME = 0.6;
export const HALF_TRANSITION_TIME = TOTAL_TRANSITION_TIME / 2;

// Duration for individual element pop animations (in seconds)
export const ELEMENT_POP_DURATION = 0.2;

// Delay between each element animation (in seconds)
// Calculated dynamically based on element count
export const ELEMENT_STAGGER_DELAY = 0.08;

// Easing function for animations
export const ANIMATION_EASING = "easeInOut" as const;

/**
 * Calculate the total time needed for all elements to animate
 * @param elementCount - Number of elements that will animate
 * @returns Total duration in seconds
 */
export function calculateTotalAnimationDuration(elementCount: number): number {
  if (elementCount === 0) return 0;
  // First element starts immediately, subsequent elements are staggered
  return ELEMENT_POP_DURATION + (elementCount - 1) * ELEMENT_STAGGER_DELAY;
}

/**
 * Calculate transition timing for a container with staggered children
 * Ensures the container transition completes after all children
 * @param elementCount - Number of child elements
 * @returns Transition configuration
 */
export function getContainerTransition(elementCount: number) {
  const totalDuration = calculateTotalAnimationDuration(elementCount);
  return {
    duration: totalDuration,
    ease: ANIMATION_EASING,
    staggerChildren: ELEMENT_STAGGER_DELAY,
    staggerDirection: 1 as const, // Top to bottom (no reverse)
  };
}

/**
 * Get transition for individual elements - Pop animation
 */
export function getElementTransition() {
  return {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };
}

/**
 * Get exit transition for individual elements - Pop out
 */
export function getElementExitTransition() {
  return {
    duration: ELEMENT_POP_DURATION,
    ease: "easeIn" as const,
  };
}

/**
 * Get transition for conditional containers (with height animations)
 * @param elementCount - Number of child elements inside the conditional container
 */
export function getConditionalContainerTransition(elementCount: number) {
  const totalDuration = calculateTotalAnimationDuration(elementCount);
  return {
    duration: totalDuration,
    ease: ANIMATION_EASING,
    height: { duration: totalDuration, ease: ANIMATION_EASING },
    opacity: { duration: ELEMENT_POP_DURATION, ease: ANIMATION_EASING },
    staggerChildren: ELEMENT_STAGGER_DELAY,
    staggerDirection: 1 as const, // Top to bottom (no reverse)
  };
}

/**
 * Get exit transition for conditional containers
 * @param elementCount - Number of child elements inside the conditional container
 */
export function getConditionalContainerExitTransition(elementCount: number) {
  const totalDuration = calculateTotalAnimationDuration(elementCount);
  return {
    duration: totalDuration * 0.8, // Slightly faster exit
    ease: ANIMATION_EASING,
    height: { duration: totalDuration * 0.8, ease: ANIMATION_EASING },
    opacity: { duration: ELEMENT_POP_DURATION * 0.6, ease: ANIMATION_EASING },
    staggerChildren: ELEMENT_STAGGER_DELAY * 0.6, // Faster stagger on exit
    staggerDirection: 1 as const, // Top to bottom (no reverse)
  };
}

/**
 * Get enter transition for conditional containers with forward order
 * @param elementCount - Number of child elements inside the conditional container
 * @param firstElementDelay - Delay before first element appears (for sequential appearance)
 */
export function getConditionalContainerEnterTransition(elementCount: number, firstElementDelay: number = 0) {
  const totalDuration = calculateTotalAnimationDuration(elementCount) + firstElementDelay;
  return {
    duration: totalDuration,
    ease: ANIMATION_EASING,
    height: { duration: totalDuration, ease: ANIMATION_EASING },
    opacity: { duration: ELEMENT_POP_DURATION, ease: ANIMATION_EASING },
    staggerChildren: ELEMENT_STAGGER_DELAY,
    staggerDirection: 1 as const, // Top to bottom for enter (first element first)
    delayChildren: firstElementDelay, // Delay before starting stagger
  };
}

/**
 * Animation variants for form containers
 * These variants handle the staggered animation of child elements
 */
export function getContainerVariants(elementCount: number) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: getContainerTransition(elementCount),
    },
  };
}

/**
 * Animation variants for individual form elements - Pop in/out animations
 */
export const elementVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 0, // No reverse movement
  },
};

/**
 * Animation variants for conditional containers (with height)
 * @param elementCount - Number of child elements
 * @param enterOrder - "forward" for top-to-bottom, "reverse" for bottom-to-top
 * @param firstElementDelay - Delay before first element appears (for forward order)
 */
export function getConditionalVariants(
  elementCount: number,
  enterOrder: "forward" | "reverse" = "reverse",
  firstElementDelay: number = 0
) {
  return {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: undefined,
      marginBottom: undefined,
      transition: enterOrder === "forward"
        ? getConditionalContainerEnterTransition(elementCount, firstElementDelay)
        : getConditionalContainerTransition(elementCount),
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: getConditionalContainerExitTransition(elementCount), // No reverse
    },
  };
}

/**
 * Get animation variants for tab content with transitions
 * Transitions are included in variants to allow different exit/enter timings
 */
export function getTabVariants(elementCount: number) {
  const enterDuration = calculateTotalAnimationDuration(elementCount);
  const exitDuration = calculateTotalAnimationDuration(elementCount);
  
  return {
    initial: { 
      opacity: 0, 
      y: 10, 
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: enterDuration,
        ease: ANIMATION_EASING,
        staggerChildren: ELEMENT_STAGGER_DELAY,
        staggerDirection: 1 as const, // Top to bottom (no reverse)
      },
    },
    exit: {
      opacity: 0,
      y: 0, // No reverse movement
      scale: 0.98,
      transition: {
        duration: exitDuration,
        ease: ANIMATION_EASING,
        staggerChildren: ELEMENT_STAGGER_DELAY * 0.7, // Slightly faster on exit
        staggerDirection: 1 as const, // Top to bottom (no reverse)
      },
    },
  };
}

/**
 * Get transition for tab switching (fallback, transitions are in variants)
 */
export function getTabTransition(elementCount: number) {
  const enterDuration = calculateTotalAnimationDuration(elementCount);
  return {
    duration: enterDuration,
    ease: ANIMATION_EASING,
    staggerChildren: ELEMENT_STAGGER_DELAY,
    staggerDirection: 1 as const, // Top to bottom (no reverse)
  };
}
