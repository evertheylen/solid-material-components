import { MDCFormField, MDCFormFieldInput } from "@material/form-field";
import { createContext, onCleanup, onMount, useContext, Component } from "solid-js";
import { assert, PropsAndAttrs } from "../utils";

import "./style.scss";

export const FormFieldContext = createContext<{input_id: string, set_input: (i: MDCFormFieldInput) => void}>();

let form_field_counter = 0;

// TODO make checkbox aware of formfield!

export const FormField: Component = (props) => {
  const input_id = `smc-formfield-input-${form_field_counter++}`;
  const context = {input_id, set_input: (i: MDCFormFieldInput) => { form_field.input = i }}

  let form_field!: MDCFormField;
  let form_field_el!: HTMLDivElement;

  onMount(() => {
    form_field = MDCFormField.attachTo(form_field_el);
  });

  onCleanup(() => {
    form_field.destroy();
  });

  return (
    <FormFieldContext.Provider value={context}>
      <div class="mdc-form-field" ref={form_field_el}>
        {props.children}
      </div>
    </FormFieldContext.Provider>
  );
}

export const Label = (props: PropsAndAttrs<'label', {input_id?: string}>) => {
  const ffCtx = useContext(FormFieldContext);
  const input_id = () => {
    const res = props.input_id ?? ffCtx?.input_id;
    assert(res !== undefined, "Label could not determine input ID. Did you wrap it in a <FormField> or manually provided an `input_id`?");
    return res;
  }

  return (
    <label for={input_id()} class="flex-grow">
      {props.children}
    </label>
  );
}
