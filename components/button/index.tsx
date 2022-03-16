import { Component } from "solid-js"

export const Button: Component<{message: string}> = (props) => {
  return <button onClick={() => alert(props.message)}>{props.children}</button>
}
