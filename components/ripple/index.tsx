import { MDCRipple } from "@material/ripple";
import { onCleanup } from "solid-js";

export function useRipple(element: HTMLElement) {
  // Element has to exist, of course, so you probably want to run this in onMount
  // Don't forget some styling is needed! See @include ripple.surface;

  const ripple = MDCRipple.attachTo(element);

  onCleanup(() => {
    ripple.destroy();
  });

  return ripple;
}
