import { events, MDCSlider, MDCSliderChangeEventDetail } from "@material/slider";
import { createSignal, onCleanup, onMount, Setter } from "solid-js";
import { createOrInitSignal, OnlyPropsAndAttrs, Ref, renderable, Signal, SignalInit, SimpleSignal, splitPropsAndAttrs } from "../utils";

import "./style.scss";

export const Slider = (allProps: OnlyPropsAndAttrs<'div', {
  value?: SignalInit<number>,
  min?: number,
  max?: number,
  step?: number,
  ref?: Ref<{value: Signal<number>}>,
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(allProps,
    ["min", "max", "step", "value", "ref"], ["class"]
  );

  let slider_el!:HTMLDivElement;
  let slider!: MDCSlider;

  const value = createOrInitSignal(props.value, 50);
  const init_value = value.get();

  onMount(() => {
    slider = MDCSlider.attachTo(slider_el);
    slider.listen(events.INPUT, (event: CustomEvent<MDCSliderChangeEventDetail>) => {
      value.set(event.detail.value);
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
      get: () => value.get(),
      set: (val) => {
        const newval = value.set(val);
        slider.setValue(newval);
        return newval;
      }
    },
  });
}
