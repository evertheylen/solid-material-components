import {ParentComponent} from "solid-js";

export const TouchTarget: ParentComponent = (props) => <div class="mdc-touch-target-wrapper">
    {props.children}
</div>;