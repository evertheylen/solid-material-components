import { JSX, createEffect } from "solid-js";

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
  if (args.length === 2) {
    const [source_signal, target_signal] = args;
    // https://playground.solidjs.com/?hash=157747006&version=1.3.9
    assert(source_signal.get() === target_signal.get(), "source and target should be equal before binding");

    createEffect(() => { target_signal.set(source_signal.get()); });
    createEffect(() => { source_signal.set(target_signal.get()); });
  } else {
    const [source_get, source_set, target_get, target_set] = args;
    // https://playground.solidjs.com/?hash=157747006&version=1.3.9
    assert(source_get() === target_get(), "source and target should be equal before binding");

    createEffect(() => { target_set(source_get()); });
    createEffect(() => { source_set(target_get()); });
  }
}


// TODO: utility to split/merge/... given root HTML attributes, used root HTML attributes and props.
