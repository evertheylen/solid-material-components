import { onMount } from "solid-js";
import { FormField, Label } from "../components/formfield";
import { Checkbox } from "../components/checkbox";
import { Signal, bind } from "../components/utils";

export const CheckboxDemo = () => {
  let checkbox!: ReturnType<typeof Checkbox>;
  const checked = new Signal<boolean>(false);

  onMount(() => {
    bind(checkbox.checked, checked);
  })

  return (
    <>
      <div class="flex-col">
        <FormField><Checkbox ref={checkbox}/><Label>Checkbox is {checked.get().toString()}</Label></FormField>
        <FormField><Checkbox initChecked={null}/><Label>Semi checked</Label></FormField>
        <FormField><Checkbox disabled={true} initChecked={true}/><Label>Disabled (checked) checkbox</Label></FormField>
        <FormField><Checkbox disabled={true} initChecked={false}/><Label>Disabled (unchecked) checkbox</Label></FormField>
      </div>
    </>
  )
}
