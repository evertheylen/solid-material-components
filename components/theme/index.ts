import { object_entries, object_from_entries } from "../utils";

// See https://github.com/material-components/material-components-web/blob/v12.0.0/packages/mdc-theme/README.md#css-custom-properties
export type MdcTheme = {
  primary: string,
  secondary: string,
  background: string,
  surface: string,
  "on-primary": string,
  "on-secondary": string,
} & {
  [Style in MdcTextStyles as `text-${Style}-on-light`]: string
} & {
  [Style in MdcTextStyles as `text-${Style}-on-dark`]: string
};

export type MdcTextStyles = 'primary' | 'secondary' | 'hint' | 'disabled' | 'icon';

export function useTheme(theme: Partial<MdcTheme>) {
  return object_from_entries(object_entries(theme).map(([k, v]) => [`--mdc-theme-${k}`, v]));
}
