import { Component } from "solid-js"
import { Button, ButtonVariant } from "../components/button"
import { useTheme } from "../components/theme"

export const ThemeDemo: Component<{setColor: (color: string) => void}> = (props) => {
  const colorbutton = (color) => (
    <Button style={useTheme({primary: color})} variant={ButtonVariant.Raised} onClick={() => props.setColor(color)}>
      {color === undefined ? "unset" : `set ${color}`}
    </Button>
  )

  return <div class="flex-row full-width flex-gap">
    <span>Set primary color:</span>
    {colorbutton('red')}
    {colorbutton('green')}
    {colorbutton('blue')}
    {colorbutton(undefined)}
  </div>
}
