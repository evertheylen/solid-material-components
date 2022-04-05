import { createEffect, onCleanup, onMount, splitProps, JSX } from "solid-js";

import { Corner } from "@material/menu";
import { MDCMenuSurface } from "@material/menu-surface";

import "./style.scss";

import { renderable, Ref, PropsAndAttrs, splitPropsAndAttrs } from "../utils";
import { useRipple } from "../ripple";


export const ANCHOR_CLASS = "mdc-menu-surface--anchor";
// Would be cool to have a `use:anchorMenu` but directives are irritating.
// See https://github.com/solidjs/solid/issues/569

const MENU_TIMEOUT_MS = 200;

// Not using MDCMenu as I want to control the state directly...

export const Menu = (allProps: PropsAndAttrs<'div', {
  anchorCorner?: Corner,
  ref?: Ref<{show_menu: () => void, close_menu: (timeout?: number) => void}>
}>) => {
  // If you don't set anchorElement, don't forget to have a parent element with class ANCHOR_CLASS!

  let menu_surface_el!: HTMLDivElement;
  let menu_surface!: MDCMenuSurface;

  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    allProps, ['children', 'anchorCorner'], ['class']
  );

  onMount(() => {
    menu_surface = MDCMenuSurface.attachTo(menu_surface_el);
  });

  createEffect(() => {menu_surface.setAnchorCorner(props.anchorCorner ?? Corner.BOTTOM_LEFT);});

  onCleanup(() => {
    menu_surface.destroy();
  });

  return renderable(allProps, {
    html: (
      <div class={extra_attrs.class("mdc-menu mdc-menu-surface")} ref={menu_surface_el} {...attrs}>
        <ul class="mdc-deprecated-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          {props.children}
        </ul>
      </div>
    ),
    show_menu: () => { menu_surface.open() },
    close_menu: (timeout: number = MENU_TIMEOUT_MS) => {
      if (timeout === undefined) {
        menu_surface.close()
      } else {
        setTimeout(() => menu_surface.close(), timeout);
      }
    }
  })
}


export const RootMenuItem = (allProps: PropsAndAttrs<'li', {}>) => {
  const [props, attrs] = splitProps(allProps, ['children'])
  return <li {...attrs}>{props.children}</li>
}


export const RootMenuDivider = (allProps: PropsAndAttrs<'li', {}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(allProps, ['children'], ['class']);
  return <li {...attrs} class={extra_attrs.class('mdc-deprecated-list-divider')} role="separator">
    {props.children}
  </li>
}


export const MenuSelectionGroup = (allProps: PropsAndAttrs<'ul', {}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(allProps, ['children'], ['class']);
  return <ul class={extra_attrs.class('mdc-menu__selection-group')} {...attrs}>
    {props.children}
  </ul>
}


export const MenuItem = (allProps: PropsAndAttrs<'li', {selected: boolean, selectedIcon?: string}>) => {
  const [props, extra_attrs, attrs] = splitPropsAndAttrs(
    allProps, ['children', 'selected', 'selectedIcon'], ['class', 'classList']
  );

  let root!: HTMLLIElement;
  onMount(() => useRipple(root));

  return (
    <li
      ref={root}
      class={extra_attrs.class('mdc-deprecated-list-item')}
      role="menuitem"
      classList={extra_attrs.classList({
        "mdc-deprecated-list-item--selected mdc-menu-item--selected": props.selected
      })}
      {...attrs}
    >
      <span class="mdc-deprecated-list-item__ripple"></span>
      <span class="mdc-menu__selection-group-icon mdc-deprecated-list-item__graphic">
        <i class="material-icons">{props.selectedIcon ?? "check"}</i>
      </span>
      <span class="mdc-deprecated-list-item__text">{props.children}</span>
    </li>
  )
};
