import { Component, createSignal } from "solid-js";

import { FilledTextField, OutlinedTextField } from "../components/textfield";

export const TextFieldDemo: Component = () => {
  const [text, setText] = createSignal("hello");

  const onInput = (e: any) => setText(e.target.value);

  return <div>
    Text is {text()}
    <div style="display: flex; flex-direction: column; gap: 10px">
    <OutlinedTextField inputAttrs={{onInput}}>{text()}</OutlinedTextField>
    <FilledTextField inputAttrs={{onInput}}>{text()}</FilledTextField>
    <OutlinedTextField inputAttrs={{onInput}} label="Hello">{text()}</OutlinedTextField>
    <FilledTextField inputAttrs={{onInput}} label="Hello">{text()}</FilledTextField>
    </div>
  </div>
}
