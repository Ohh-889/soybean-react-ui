import type { PossibleRef } from "./compose-refs";
import { composeRefs } from "./compose-refs";
import type {  RefCallback } from "react";
import { useCallback } from 'react'



/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
    return useCallback(composeRefs(...refs), refs);
}