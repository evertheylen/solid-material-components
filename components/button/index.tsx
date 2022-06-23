import {onMount, Show} from "solid-js";
import {useRipple} from "../ripple";
import {PropsAndAttrs, splitPropsAndAttrs} from "../utils";
import "./style.scss";


export enum ButtonVariant {
  Contained,
  None,
  Outlined,
  Raised,
};

export const Button = (allProps: PropsAndAttrs<'button', {
  variant?: ButtonVariant,
  icon?: string,
  touch?: boolean,
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    allProps, ["variant", "icon", "children", "touch"], ["class", "classList"]
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
        'mdc-button--unelevated': props.variant === ButtonVariant.Contained,
        'mdc-button--touch': props.touch,
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
};
