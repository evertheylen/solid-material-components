import { MDCCheckbox } from "@material/checkbox";
import { createEffect, onCleanup, onMount, useContext } from "solid-js";

import { FormFieldContext } from "../formfield";
import { createOrInitSignal, OnlyPropsAndAttrs, Ref, renderable, SignalInit, SimpleSignal, splitPropsAndAttrs } from "../utils";

import "./style.scss";

// TODO indeterminate state seems to have a slight delay when displaying

export const Checkbox = (all_props: OnlyPropsAndAttrs<'div', {
  checked?: SignalInit<boolean | null>,
  disabled?: boolean,
  id?: string,
  ref?: Ref<{checked: SimpleSignal<boolean | null>}>
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    all_props, ["checked", "disabled", "id", "ref"], ["class"]
  );
  
  const ffCtx = useContext(FormFieldContext);
  const id = props.id ?? ffCtx?.input_id;

  let checkbox!: MDCCheckbox;
  let checkboxElement!: HTMLDivElement;

  // static stuff
  const checked = createOrInitSignal(props.checked, false);
  const initChecked = checked.get();

  onMount(() => {
    checkbox = new MDCCheckbox(checkboxElement)
    ffCtx?.set_input(checkbox);

    // readonly state
    createEffect(() => checkbox.disabled = props.disabled ?? false);
    // readwrite state
    createEffect(() => {
      const val = checked.get();
      if (val === null) {
        checkbox.indeterminate = true;
      } else {
        checkbox.indeterminate = false;
        checkbox.checked = val;
      }
    });
    
    checkbox.listen('change', (evt: any) => {
      checked.set(evt.target.checked);
    });
  });

  onCleanup(() => {
    checkbox.destroy();
  });

  const html = (
    <div class={extra_attrs.class("mdc-checkbox")} ref={checkboxElement} {...attrs}>
      <input type="checkbox" class="mdc-checkbox__native-control" id={id} checked={initChecked ?? false}/>
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
  )

  return renderable(props, {html, checked});
}
