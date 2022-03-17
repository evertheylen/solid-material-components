import { JSX, createEffect, splitProps } from "solid-js";

export function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) {
    throw new Error(msg ?? "Assertion was false");
  }
}

// Return or ref={...} more complex objects, including controlled state
export function renderable<Output>(props: any, object: {html: JSX.Element} & Output) {
  const result = () => object.html;
  // @ts-ignore
  props.ref && props.ref(object);
  Object.assign(result, object);
  return result as (() => JSX.Element) & Output;
}

export type SimpleSignalWrapper<T> = {get: () => T, set: (val: T) => void};

// Some state is more naturally modelled as controlled state (and forced this way by MDC). If
// you want to a 2-way binding, you can do so with this utility function.
export function bind<T>(source_signal: SimpleSignalWrapper<T>, target_signal: SimpleSignalWrapper<T>): void;
export function bind<T>(source_get: () => T, source_set: (x: T) => void, target_get: () => T, target_set: (x: T) => void): void;
export function bind<T>(
  ...args: [SimpleSignalWrapper<T>, SimpleSignalWrapper<T>] | [() => T, (x: T) => void, () => T, (x: T) => void]
) {
  // Some experiments: https://playground.solidjs.com/?hash=157747006&version=1.3.9
  if (args.length === 2) {
    const [source_signal, target_signal] = args;
    assert(source_signal.get() === target_signal.get(), "source and target should be equal before binding");

    createEffect(() => { target_signal.set(source_signal.get()); });
    createEffect(() => { source_signal.set(target_signal.get()); });
  } else {
    const [source_get, source_set, target_get, target_set] = args;
    assert(source_get() === target_get(), "source and target should be equal before binding");

    createEffect(() => { target_set(source_get()); });
    createEffect(() => { source_set(target_get()); });
  }
}

export type PropsAndAttrs<T extends keyof JSX.IntrinsicElements, P> = P & JSX.IntrinsicElements[T];

// To merge given attributes (that are supposed to go on root element) with our own
type Attr<T extends keyof JSX.HTMLAttributes<El>, El = HTMLElement> = JSX.HTMLAttributes<El>[T];
type MergeFunc<T extends keyof JSX.HTMLAttributes<El>, El = HTMLElement> = (a: Attr<T, El>, b: Attr<T, El>) => Attr<T, El>;

export function defineMerge<T extends keyof JSX.HTMLAttributes<El>, El = HTMLElement>(key: T, func: MergeFunc<T, El>) {
  return func;
}

export const merge: {[Key in keyof JSX.HTMLAttributes<HTMLElement>]: MergeFunc<Key>} = {
  "class": (a, b) => `${a ?? ''} ${b ?? ''}`,
  "classList": (a, b) => ({...a, ...b}),
  // style can be just defined multiple times, Solid will merge them!
}

export function splitPropsAndAttrs<T extends object, Props extends keyof T, OverriddenAttrs extends (keyof T & keyof typeof merge)>(
  all_props: T, prop_keys: Props[], overridden_attr_keys: OverriddenAttrs[]
): [Pick<T, Props>, { [P in OverriddenAttrs]: (x: T[P]) => T[P] }, Omit<T, Props | OverriddenAttrs>] {
  const [props, raw_overridden_attrs, rest_attrs] = splitProps(all_props, prop_keys, overridden_attr_keys);
  const overridden_attrs = new Proxy(
    raw_overridden_attrs,
    // @ts-ignore
    { get(target, prop, receiver) { return (value: any) => merge[prop](value, target[prop]) }}
  ) as unknown as { [P in OverriddenAttrs]: (x: T[P]) => T[P] };
  return [props, overridden_attrs, rest_attrs];
}

// Ponyfills?

export function object_from_entries<T>(iterable: Iterable<[key: string, val: T]>): Record<string, T> {
  return [...iterable].reduce((obj: any, [key, val]) => {
    obj[key] = val
    return obj
  }, {});
}

export function object_keys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function object_entries<T>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
