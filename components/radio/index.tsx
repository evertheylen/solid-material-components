import { createContext, createEffect, onCleanup, onMount, PropsWithChildren, useContext } from "solid-js";
import { MDCRadio } from "@material/radio";
import { assert, createOrInitSignal, OnlyPropsAndAttrs, Ref, renderable, Signal, SignalInit, splitPropsAndAttrs } from "../utils";

import "./style.scss";
import { FormFieldContext } from "../formfield";

export type RadioGroupDelegate = {
  group: string,
  activeKey: Signal<string | null>,
  addInput: (key: string, input: MDCRadio) => void,
  removeInput: (key: string) => void
};

export const RadioGroupContext = createContext<RadioGroupDelegate>();

let radio_group_counter = 0;

export const RadioGroup = (props: PropsWithChildren<{
  group?: string,
  activeKey?: SignalInit<string|null>,
  ref?: Ref<{activeKey: Signal<string|null>}>
}>) => {
  const group = props.group ?? `smc-radio-group-${radio_group_counter++}`;
  const input_map = new Map<string, MDCRadio>();

  const activeKey = createOrInitSignal(props.activeKey, null);

  const delegate: RadioGroupDelegate = {
    group,
    activeKey,
    addInput(key, input) {
      assert(!input_map.has(key), `Key ${key} already exists`);
      input_map.set(key, input);
    },
    removeInput(key) {
      input_map.delete(key);
    }
  };

  const html = (
    <RadioGroupContext.Provider value={delegate}>
      {props.children}
    </RadioGroupContext.Provider>
  )

  return renderable(props, {html, activeKey});
}

export const Radio = (all_props: OnlyPropsAndAttrs<'div', {
  key: string,
  disabled?: boolean,
  id?: string,
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    all_props, ["key", "disabled", "id"], ["class"]
  );

  const form_field_context = useContext(FormFieldContext);
  const radio_group_context = useContext(RadioGroupContext);
  assert(radio_group_context !== undefined, "<Radio> must be used within a <RadioGroup> or you must manually ");

  const key = props.key;
  const id = props.id ?? form_field_context?.input_id;
  const init_checked = radio_group_context.activeKey.get() === props.key;

  let radio!: MDCRadio;
  let radio_el!: HTMLDivElement;

  onMount(() => {
    radio = MDCRadio.attachTo(radio_el);
    form_field_context?.set_input(radio);
    createEffect(() => { radio.disabled = props.disabled ?? false });
    createEffect(() => { radio.checked = radio_group_context.activeKey.get() === key });
    radio.listen('change', (event: any) => {
      if (event.target.checked) {
        radio_group_context.activeKey.set(key);
      }
    });
  });

  onCleanup(() => {
    radio_group_context.removeInput(key);
    radio.destroy();
  })

  return (
    <div class={extra_attrs.class("mdc-radio")} ref={radio_el} {...attrs}>
      <input class="mdc-radio__native-control" type="radio" id={id} name={radio_group_context.group} checked={init_checked}></input>
      <div class="mdc-radio__background">
        <div class="mdc-radio__outer-circle"></div>
        <div class="mdc-radio__inner-circle"></div>
      </div>
      <div class="mdc-radio__ripple"></div>
      <div class="mdc-radio__focus-ring"></div>
    </div>
  );
}
