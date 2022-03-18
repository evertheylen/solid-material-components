import { createSignal } from "solid-js";
import { Radio, RadioGroup } from "../components/radio";
import { FormField, Label } from "../components/formfield";

export const RadioDemo = () => {
  const [disabled, setDisabled] = createSignal(false);
  let group!: ReturnType<typeof RadioGroup>;

  return (
    <>
      <button onClick={() => setDisabled(x => !x)}>toggle disable of second radio</button>
      <div class="flex-col">
        <RadioGroup ref={group}>
          <FormField>
            <Radio key="hello"/>
            <Label>Hello</Label>
          </FormField>
          <FormField>
            <Radio key="there" disabled={disabled()}/>
            <Label>There</Label>
          </FormField>
          <FormField>
            <Radio key="general"/>
            <Label>General</Label>
          </FormField>
          <FormField>
            <Radio key="kenobi"/>
            <Label>Kenobi</Label>
          </FormField>
        </RadioGroup>
      </div>
      <p>Selected: {group.activeKey.get()}</p>
    </>
  )
}
