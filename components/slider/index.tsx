import { events, MDCSlider, MDCSliderChangeEventDetail } from "@material/slider";
import { createSignal, onCleanup, onMount, Setter } from "solid-js";
import { OnlyPropsAndAttrs, Ref, renderable, Signal, SimpleSignalWrapper, splitPropsAndAttrs } from "../utils";

import "./style.scss";

export const Slider = (all_props: OnlyPropsAndAttrs<'div', {
  min?: number,
  max?: number,
  step?: number,
  init_value?: number,
  ref?: Ref<{value: Signal<number>}>,
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(all_props,
    ["min", "max", "step", "init_value", "ref"], ["class"]
  );

  let slider_el!:HTMLDivElement;
  let slider!: MDCSlider;

  const init_value = props.init_value ?? 50;
  const [getValue, setValue] = createSignal(init_value);

  onMount(() => {
    slider = MDCSlider.attachTo(slider_el);
    slider.listen(events.INPUT, (event: CustomEvent<MDCSliderChangeEventDetail>) => {
      setValue(event.detail.value);
    });
  });

  onCleanup(() => {
    slider.destroy();
  });

  const html = (
    <div class={extra_attrs.class("mdc-slider")} ref={slider_el} {...attrs}>
      <input
        class="mdc-slider__input" type="range"
        /* @ts-ignore */
        attr:value={init_value}
        min={props.min ?? 0} max={props.max ?? 100} step={props.step ?? 1}
      ></input>
      <div class="mdc-slider__track">
        <div class="mdc-slider__track--inactive"></div>
        <div class="mdc-slider__track--active">
          <div class="mdc-slider__track--active_fill"></div>
        </div>
      </div>
      <div class="mdc-slider__thumb">
        <div class="mdc-slider__thumb-knob"></div>
      </div>
    </div>
  );

  return renderable(props, {
    html,
    value: {
      get: getValue,
      set: ((val) => {
        const newval = setValue(val);
        slider.setValue(newval);
      }) as Setter<number>
    },
  });
}
