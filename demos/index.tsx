import { render } from 'solid-js/web';
import { Button } from '../components/button';

export const App = () => (
  <p>Hello world! <Button message="hello!">Click me</Button></p>
)

render(() => <App />, document.getElementById('root'));
