import { Component, createSignal, For } from "solid-js";

import { FilterChipSet, FilterChip } from "../components/chips";
import { Signal } from "../components/utils";

export const ChipDemo: Component = () => {
  const chips = [
    {name: "Foo (disabled)", signal: new Signal(true), disabled: true},
    {name: "Bar", signal: new Signal(false)},
    {name: "Quuz", signal: new Signal(true)},
    {name: "Home", signal: new Signal(false), icon: 'home'}
  ];

  return <>
    <p>Selected: {chips.map(({name, signal}) => signal.get().toString()).join(", ")}</p>
    <FilterChipSet>
      <For each={chips}>{({name, signal, ...attrs}) => 
        <FilterChip selected={signal.get()} setSelected={(x) => signal.set(x)} {...attrs}>{name}</FilterChip>
      }</For>
    </FilterChipSet>
  </>
};
