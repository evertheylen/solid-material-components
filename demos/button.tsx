import { createSignal } from 'solid-js';
import { Button, ButtonVariant } from '../components/button';

export const ButtonDemo = () => {
  const [count, setCount] = createSignal(0);
  return (
    <div class="flex-col flex-gap">
      <p>Count is {count()}</p>
      <Button style={{"max-width": "200px"}} variant={ButtonVariant.None} onClick={() => setCount(x => x+1)}>Default</Button>
      <Button style={{"max-width": "200px"}} variant={ButtonVariant.Outlined} onClick={() => setCount(x => x+1)}>Outlined</Button>
      <Button style={{"max-width": "200px"}} variant={ButtonVariant.Raised} onClick={() => setCount(x => x+1)}>Outlined</Button>
      <Button style={{"max-width": "200px"}} variant={ButtonVariant.Raised} icon={"mediation"} onClick={() => setCount(x => x+1)}>With icon</Button>
    </div>
  );
}


