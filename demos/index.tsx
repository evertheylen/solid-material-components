import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import { ButtonDemo } from './button';
import { IconButtonDemo } from './icon-button';
import { ThemeDemo } from './theme';
import { useTheme } from "../components/theme";
import { CheckboxDemo } from './checkbox';
import { RadioDemo } from './radio';

import "./style.scss";
import { ChipDemo } from './chips';
import { SliderDemo } from './slider';

// For theme demo
const [primaryColor, setPrimaryColor] = createSignal<string | undefined>();

const App = () => (
  <div style={useTheme({primary: primaryColor()})} class="page">
    <h1>Solid Material Components</h1>
    <p>Welcome to the crappy little demo page of the components in this library.</p>
    <h3>Theme</h3>
    <ThemeDemo setColor={setPrimaryColor}/>
    <h3>Buttons</h3>
    <ButtonDemo/>
    <h3>Icon Buttons</h3>
    <IconButtonDemo/>
    <h3>Checkboxes</h3>
    <CheckboxDemo/>
    <h3>Radios</h3>
    <RadioDemo/>
    <h3>Chips</h3>
    <ChipDemo/>
    <h3>Slider</h3>
    <SliderDemo/>
  </div>
)

render(() => <App />, document.getElementById('root'));
