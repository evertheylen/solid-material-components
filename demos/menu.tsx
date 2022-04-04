import { Component } from "solid-js";
import { Signal } from "../components/utils";
import { Menu, RootMenuDivider, RootMenuItem, MenuSelectionGroup, MenuItem, ANCHOR_CLASS } from "../components/menu";

export const MenuDemo: Component = () => {
  let menu!: ReturnType<typeof Menu>;
  const signals = [new Signal(true), new Signal(false), new Signal(true), new Signal(false)];

  return <>
    <div class={ANCHOR_CLASS}>
      <button id="menu-button" onClick={() => menu.show_menu()}>Open Menu</button>
      <Menu ref={menu}>
        <RootMenuItem>
          <MenuSelectionGroup>
            <MenuItem selected={signals[0].get()} onClick={(evt) => {signals[0].set(x => !x)}}>Foo</MenuItem>
            <MenuItem selected={signals[1].get()} onClick={(evt) => {signals[1].set(x => !x)}}>Bar</MenuItem>
          </MenuSelectionGroup>
        </RootMenuItem>
        <RootMenuDivider/>
        <RootMenuItem>
          <MenuSelectionGroup>
            <MenuItem selected={signals[0].get()}>Quuz</MenuItem>
            <MenuItem selected={false}>Kaas</MenuItem>
          </MenuSelectionGroup>
        </RootMenuItem>
      </Menu>
    </div>
  </>
}
