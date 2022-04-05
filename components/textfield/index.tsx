import { MDCTextField } from "@material/textfield";
import { Component, createEffect, JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { merge, PropsAndAttrs, Ref, renderable, splitAttrs, splitPropsAndAttrs } from "../utils";

import "./style.scss";

enum TextFieldVariant { Outlined, Filled };

type IconDescriptor = {icon: string, onClick?: () => any};


const TextFieldHelper = (allProps: PropsAndAttrs<'div', {
  persistent?: boolean, validation?: boolean,
}>) => {
  const [props, extraAttrs, attrs] = splitPropsAndAttrs(allProps, ['persistent'], ['class']);

  return (
    <div class={extraAttrs.class("mdc-text-field-helper-line")}>
      <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" aria-hidden="true">{attrs.children}</div>
    </div>
  );
}

// Filled with helper

const fill_with_helper_charcount_and_icons = <>
  <div class="mdc-text-field mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon">
    <i aria-hidden="true" class="material-icons mdc-text-field__icon">favorite</i>
    <i aria-hidden="true" class="material-icons mdc-text-field__icon">visibility</i>
    <input class="mdc-text-field__input" autocorrect="off" autocomplete="off" spellcheck="false" id="demo-mdc-text-field" maxlength="20"></input>
    <div class="mdc-line-ripple" style="transform-origin: 139.333px center 0px;"></div>
    <label for="demo-mdc-text-field" class="mdc-floating-label">Label</label>
  </div>
  <div class="mdc-text-field-helper-line">
    <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">Helper message</div>
    <div class="mdc-text-field-character-counter">0 / 20</div>
  </div>
</>

const outline_with_error = <>
  <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--invalid">
    <input class="mdc-text-field__input" autocorrect="off" autocomplete="off" spellcheck="false" id="demo-mdc-text-field" maxlength="524288" required pattern="[a-z]{256,}"></input>
    <div class="mdc-notched-outline mdc-notched-outline--upgraded">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch" style="">
        <label for="demo-mdc-text-field" class="mdc-floating-label" style="">Label</label>
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
  <div class="mdc-text-field-helper-line">
    <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" role="alert"><!---->Error message<!----></div>
  </div>
</>


const _TextFieldFactory = (variant: TextFieldVariant) => (props: {
  children?: string,
  label?: JSX.Element,
  helper?: JSX.Element,
  inputType?: string,
  disabled?: boolean,
  leadingIcon?: IconDescriptor,
  trailingIcon?: IconDescriptor,
  labelAttrs?: JSX.IntrinsicElements['label'],
  inputAttrs?: JSX.IntrinsicElements['input'],
  helperAttrs?: JSX.IntrinsicElements['div'],
  ref?: Ref<{label?: JSX.Element, input?: JSX.Element, helper?: JSX.Element}>,
}) => {
  let label_el!: HTMLLabelElement;
  let input_el!: HTMLInputElement;
  let textfield!: MDCTextField;

  let result!: {html: JSX.Element, label?: JSX.Element, input?: JSX.Element, helper?: JSX.Element};

  onMount(() => {
    textfield = MDCTextField.attachTo(label_el);

    createEffect(() => {
      textfield.value = props.children ?? "";
    });

    result.label = label_el;
    result.input = input_el;
  });

  onCleanup(() => {
    textfield.destroy();
  });

  const Icon = (type: string, icon?: IconDescriptor) => icon !== undefined ? (
    icon.onClick !== undefined ? (
      <i class={`material-icons mdc-text-field__icon mdc-text-field__icon--${type}`}
         tabindex="0" role="button" onClick={icon.onClick}>{icon.icon}</i>
    ) : (
      <i class={`material-icons mdc-text-field__icon mdc-text-field__icon--${type}`}>{icon.icon}</i>
    )
  ) : [];
  
  const classList = () => ({
    'mdc-text-field--disabled': props.disabled,
    'mdc-text-field--with-leading-icon': props.leadingIcon !== undefined,
    'mdc-text-field--with-trailing-icon': props.trailingIcon !== undefined
  });

  if (variant === TextFieldVariant.Outlined) {
    const html = (
      <label
        ref={label_el}
        {...props?.labelAttrs}
        class={merge.class(props?.labelAttrs?.class, "mdc-text-field mdc-text-field--outlined")}
        classList={merge.classList(props?.labelAttrs?.classList, classList())}
      >
        <span class="mdc-notched-outline">
          <span class="mdc-notched-outline__leading"></span>
          <span class="mdc-notched-outline__notch">
            <Show when={props.label}>
              <span class="mdc-floating-label">{props.label}</span>
            </Show>
          </span>
          <span class="mdc-notched-outline__trailing"></span>
        </span>
        {Icon("leading", props.leadingIcon)}
        <input
          ref={input_el}
          {...props?.inputAttrs}
          class={merge.class(props?.inputAttrs?.class, "mdc-text-field__input")}
          type={props.inputType ?? "text"}
        ></input>
        {Icon("trailing", props.trailingIcon)}
      </label>
    );
    result = {html};
  } else {
    const html = (
      <label
        ref={label_el}
        {...props?.labelAttrs}
        class={merge.class(props?.labelAttrs?.class, "mdc-text-field")}
        classList={merge.classList(props?.labelAttrs?.classList, classList())}
      >
        <span class="mdc-text-field__ripple"></span>
        <Show when={props.label}>
          <span class="mdc-floating-label">{props.label}</span>
        </Show>
        {Icon("leading", props.leadingIcon)}
        <input
          ref={input_el}
          {...props?.inputAttrs}
          class={merge.class(props?.inputAttrs?.class, "mdc-text-field__input")}
          type={props.inputType ?? "text"}
        ></input>
        {Icon("trailing", props.trailingIcon)}
        <span class="mdc-line-ripple"></span>
      </label>
    );
    result = {html};
  }
  return renderable(props, result);
}

export const FilledTextField = _TextFieldFactory(TextFieldVariant.Filled);
export const OutlinedTextField = _TextFieldFactory(TextFieldVariant.Outlined);
