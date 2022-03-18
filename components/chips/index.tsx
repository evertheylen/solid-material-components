import { Component, createContext, createEffect, onCleanup, onMount, Show, useContext } from 'solid-js';
import { MDCChipSet, MDCChipSetSelectionEventDetail } from '@material/chips';
import { MDCChipActionType } from '@material/chips/action/constants';

import "./style.scss";
import { assert, PropsAndAttrs, splitPropsAndAttrs } from '../utils';

// TODO harmonize state management here. Is it controlled or uncontrolled?
// TODO remove having to manage state in MDCChipSet!
// TODO provide outlined style (not in MDC)

const ParentChipSetContext = createContext<() => MDCChipSet>();

const InnerChipSet: Component = (props) => {
  let root!: HTMLSpanElement;
  let chipset!: MDCChipSet;

  onMount(() => {
    chipset = MDCChipSet.attachTo(root);
  });

  onCleanup(() => {
    chipset.destroy();
  });

  return (
    <ParentChipSetContext.Provider value={() => chipset}>
      <span
        class="mdc-evolution-chip-set"
        role="listbox"
        aria-orientation="horizontal"
        aria-multiselectable="true"
        ref={root}
      >
        <span class="mdc-evolution-chip-set__chips" role="presentation">
          {props.children}
        </span>
      </span>
    </ParentChipSetContext.Provider>
  );
}

export const FilterChipSet = (all_props: PropsAndAttrs<'span', {
  overflow?: boolean,
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    all_props, ["overflow", "children"], ["class", "classList"]
  );
  
  return (
    <span
      class={extra_attrs.class('mdc-evolution-chip-set')}
      role="listbox"
      aria-orientation="horizontal"
      aria-multiselectable="true"
      classList={extra_attrs.classList({"mdc-evolution-chip-set--overflow": props.overflow ?? false})}
      {...attrs}
    >
      <InnerChipSet>{props.children}</InnerChipSet>
    </span>
  );
}


let chipCounter = 0;

export const FilterChip = (all_props: PropsAndAttrs<'span', {
  disabled?: boolean, selected?: boolean, setSelected?: (selected: boolean) => void, icon?: string
}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    all_props, ["disabled", "selected", "setSelected", "icon", "children"], ["class", "classList"]
  );

  const id = `smdc-chip-${chipCounter++}`;
  let parent!: MDCChipSet;
  let index!: number;
  const parent_ctx = useContext(ParentChipSetContext);
  assert(parent_ctx !== undefined, "Using FilterChip outside of a FilterChipSet");

  onMount(() => {
    parent = parent_ctx();
    index = parent.getChipIndexByID(id);

    parent.listen<CustomEvent<MDCChipSetSelectionEventDetail>>('MDCChipSet:selection', (evt) => {
      if (props.setSelected !== undefined && evt.detail.chipIndex === index) {
        props.setSelected(evt.detail.isSelected);
      }
    });
  });

  createEffect(() => {
    // TODO this is ran too late, state should be present without the animation...
    if (props.selected !== parent.getSelectedChipIndexes().has(index)) {
      parent.setChipSelected(index, MDCChipActionType.PRIMARY, props.selected ?? false);
    }
  });

  return (
    <span
      class={extra_attrs.class("mdc-evolution-chip mdc-evolution-chip--selectable mdc-evolution-chip--filter mdc-evolution-chip--with-primary-graphic")}
      classList={extra_attrs.classList({
        'mdc-evolution-chip--disabled': props.disabled,
        "mdc-evolution-chip--with-primary-icon": props.icon !== undefined
      })}
      role="presentation"
      id={id}
      {...attrs}
    >
      <span class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" role="option" aria-selected="false" aria-disabled={props.disabled}>
        <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
        <span class="mdc-evolution-chip__graphic">
          <Show when={props.icon !== undefined}>
            <span class="mdc-evolution-chip__icon mdc-evolution-chip__icon--primary material-icons">{props.icon}</span>
          </Show>
          <span class="mdc-evolution-chip__checkmark">
            <svg class="mdc-evolution-chip__checkmark-svg" viewBox="-2 -3 30 30">
              <path class="mdc-evolution-chip__checkmark-path"
                  fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
            </svg>
          </span>
        </span>
        <span class="mdc-evolution-chip__text-label">{props.children}</span>
      </span>
    </span>
  );
}
