import { onMount, Show } from "solid-js";
import { useRipple } from "../ripple";
import { OnlyPropsAndAttrs, PropsAndAttrs, renderable, splitPropsAndAttrs } from "../utils";

import "./style.scss";

export enum ButtonVariant {
  Raised, Outlined, None
};

export const Button = (all_props: PropsAndAttrs<'button', {
  variant?: ButtonVariant,
  icon?: string
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    all_props, ["variant", "icon", "children"], ["class", "classList"]
  );

  let root!: HTMLButtonElement;

  onMount(() => {
    useRipple(root);
  });

  return (
    <button
      ref={root}
      class={extra_attrs.class('mdc-button')}
      classList={extra_attrs.classList({
        'mdc-button--icon--leading': props.icon !== undefined,
        'mdc-button--outlined': props.variant === ButtonVariant.Outlined,
        'mdc-button--raised': props.variant === ButtonVariant.Raised,
      })}
      {...attrs}
    >
      <span class="mdc-button__ripple"></span>
      <Show when={props.icon !== undefined}>
        <i class="material-icons mdc-button__icon" aria-hidden="true">{props.icon}</i>
      </Show>
      <Show when={typeof props.children === 'string'} fallback={props.children}>
        <span class="mdc-button__label">{props.children}</span>
      </Show>
    </button>
  );
}
