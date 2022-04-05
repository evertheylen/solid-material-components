import { onMount } from "solid-js";
import { useRipple } from "../ripple";
import { OnlyPropsAndAttrs, splitPropsAndAttrs } from "../utils";

import "./style.scss";

export const IconButton = (allProps: OnlyPropsAndAttrs<'button', {
  icon: string,
  enabled?: boolean
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    allProps, ["icon", "enabled"], ["class"]
  );

  let root!: HTMLButtonElement;

  onMount(() => {
    const ripple = useRipple(root)
    ripple.unbounded = true
  });

  return (
    <button
      ref={root}
      class={extra_attrs.class('mdc-icon-button material-icons')}
      aria-pressed={props.enabled ?? false}
      {...attrs}
    >
      <div class="mdc-icon-button__ripple"></div>
      {props.icon}
    </button>
  )
}
