
> **❗ NOTE ❗**
> 
> **While this library may still be of use for those who want a simple wrapper for [Material Design Components](https://material.io/components/), I myself have been using https://github.com/swordev/suid and will be focusing my efforts there.**

----------------------------------

# Solid Material Components

Port of [Material Design Components](https://material.io/components/) for [SolidJS](https://www.solidjs.com/). In the future, self-made components could be provided.

You can see [online demos of all components in Material Design Components](https://material-components.github.io/material-components-web-catalog/#/). I will provide a demo page specific to this library soon.


## Status

This library is a work in progress. I will add components as I need them myself. Released components should be perfectly usable, but API changes may happen.

Currently ported:

  - buttons
  - icon buttons
  - ripple effects
  - checkboxes
  - radio buttons
  - sliders
  - (filter) chips

I have many more components already ported, but not yet ready to release. More progress soon!


## Usage

**Currently only supports usage with _vite_. A separate package will be released in a more traditional
way that's usable in all circumstances.**

  - Install `pnpm add solid-material-components`
  - No need to import any CSS (thanks to vite)!
  - Optionally import the icon font by placing the following in your `<head>` tag:

    `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`
  - Just import components and use them. For example:

    ```jsx
    import { Button } from "solid-material-components/button";
    // ...
    <Button>Hello world!</Button>
    ```

## Contributing

I very much welcome PRs! Feel free to reach out to me first to discuss the component you want to port,
or what other change you want implemented. I'm also active on [Solid's Discord server](https://discord.com/invite/solidjs).


## TODOs

  - [ ] (better) global theming solution
  - [ ] non-vite package
  - [ ] online demo page
  - [ ] more components!
