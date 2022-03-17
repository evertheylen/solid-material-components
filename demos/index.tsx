import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { Button, ButtonVariant } from '../components/button';
import { useTheme } from "../components/theme";

const ButtonDemo = () => {
  const [count, setCount] = createSignal(0);
  return (
    <p>Count is {count()} <Button variant={ButtonVariant.Raised} disabled={false} onClick={() => setCount(x => x+1)}>Click me</Button></p>
  );
}

const ThemeDemo = () => (
  <div style={useTheme({primary: "red"})}>
    <ButtonDemo/>
  </div>
)

const App = () => (
  <>
    <ButtonDemo/>
    <ThemeDemo/>
  </>
)

render(() => <App />, document.getElementById('root'));
