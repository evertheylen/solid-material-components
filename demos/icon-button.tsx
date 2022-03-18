import { createSignal } from 'solid-js';
import { IconButton } from '../components/icon-button';

export const IconButtonDemo = () => {
  const [count, setCount] = createSignal(0);
  return (
    <div class="flex-col flex-gap">
      <p>Count is {count()}</p>
      <span>Icon button: <IconButton icon={"public"} onClick={() => setCount(x => x+1)}/></span>
      <span>Selected icon button: <IconButton enabled={true} icon={"fact_check"} onClick={() => setCount(x => x+1)}/></span>
    </div>
  );
}


