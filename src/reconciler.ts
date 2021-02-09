import ReactReconciler, { OpaqueHandle } from "react-reconciler";
import { Method, methods } from "./commons";
import { RootElement, RouteElement, RouterElement, StaticElement } from "./elements";
import { asyncHandler } from "./internalMiddlewares";

type Type = string;
type Props = Record<string, any>;
type Container = null;
type Instance = RootElement | RouterElement | RouteElement | StaticElement;
type TextInstance = string;
type SuspenseInstance = any;
type HydratableInstance = any;
type PublishInstance = any;
type HostContext = any;
type UpdatePayload = any;
type _ChildSet = any;
type TimeoutHandle = number;
type NoTimeout = any;

export const Reconciler = ReactReconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublishInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: false,
  isPrimaryRenderer: true,
  createInstance,
  createTextInstance,
  appendInitialChild,
  finalizeInitialChildren,
  prepareUpdate,
  shouldSetTextContent,
  getRootHostContext,
  getChildHostContext,
  getPublicInstance,
  prepareForCommit,
  resetAfterCommit,
  preparePortalMount,
  now,
  scheduleTimeout,
  cancelTimeout,
  queueMicrotask,
  appendChild,
  appendChildToContainer,
  insertBefore,
  insertInContainerBefore,
  removeChild,
  removeChildFromContainer,
  resetTextContent,
  commitTextUpdate,
  commitMount,
  commitUpdate,
  hideInstance,
  hideTextInstance,
  unhideInstance,
  unhideTextInstance,
  clearContainer,
});

function createInstance(
  type: Type,
  props: Props,
  rootContainer: Container,
  hostContext: HostContext,
  internalHandle: OpaqueHandle
): Instance {
  switch (type) {
    case "app": {
      const { port = 3000, middleware = [], urlEncoded = null, onListen = () => {} } = props as JSX.IntrinsicElements["app"];
      return new RootElement({ port, middleware, urlEncoded, onListen });
    }
    case "router": {
      const { path, caseSensitive = false, mergeParams = false, strict = false } = props as JSX.IntrinsicElements["router"];
      return new RouterElement({ caseSensitive, mergeParams, strict, path });
    }
    case "static": {
      const { path, ...option } = props as JSX.IntrinsicElements["static"];
      return new StaticElement(path, option);
    }
  }
  if (methods.has(type as Method)) {
    const { path, controller } = props as JSX.IntrinsicElements["get"];
    return new RouteElement(type as Method, path, controller);
  }
  throw new Error("Unknown type.");
}

function createTextInstance(text: string, rootContainer: Container, hostContext: HostContext, internalHandle: OpaqueHandle): TextInstance {
  return text;
}

function appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
  if (isAppElement(child)) {
    throw new Error("Router cannot be inside.");
  }
  if (isAppElement(parentInstance) || isRouterElement(parentInstance)) {
    if (isRouterElement(child)) {
      parentInstance.use(child.path, child.intoController());
      return;
    }
    if (isStaticElement(child)) {
      parentInstance.use(child.intoController());
      return;
    }
    if (isRouteElement(child)) {
      const { method, path, controller } = child;
      parentInstance[method](path, asyncHandler(controller) as any);
      return;
    }
    return;
  }
  if (isRouteElement(parentInstance)) {
    if (isRouterElement(child)) {
      throw new Error("Router cannot be inside a route.");
    }
    if (isRouteElement(child)) {
      throw new Error("Route cannot be inside a route.");
    }
    if (isStaticElement(child)) {
      throw new Error("Static cannot be inside a route.");
    }
  }
  if (isStaticElement(parentInstance)) {
    if (isRouterElement(child)) {
      throw new Error("Router cannot be inside a static.");
    }
    if (isRouteElement(child)) {
      throw new Error("Route cannot be inside a static.");
    }
    if (isStaticElement(child)) {
      throw new Error("Static cannot be inside a static.");
    }
  }
}

function finalizeInitialChildren(
  instance: Instance,
  type: Type,
  props: Props,
  rootContainer: Container,
  hostContext: HostContext
): boolean {
  return false;
}

function prepareUpdate(
  instance: Instance,
  type: Type,
  oldProps: Props,
  newProps: Props,
  rootContainer: Container,
  hostContext: HostContext
): UpdatePayload | null {
  //
}

function shouldSetTextContent(type: Type, props: Props): boolean {
  return false;
}

function getRootHostContext(rootContainer: Container): HostContext | null {
  //
}

function getChildHostContext(parentHostContext: HostContext, type: Type, rootContainer: Container): HostContext {
  //
}

function getPublicInstance(instance: Instance | TextInstance): PublishInstance {
  //
}

function prepareForCommit(containerInfo: Container): Record<string, any> | null {
  return null;
}

function resetAfterCommit(containerInfo: Container): void {
  //
}

function preparePortalMount(containerInfo: Container): void {
  //
}

function now(): number {
  return Date.now();
}

function scheduleTimeout(fn: (...args: unknown[]) => unknown, delay?: number): TimeoutHandle {
  return window.setTimeout(fn, delay);
}

function cancelTimeout(id: TimeoutHandle): void {
  window.clearTimeout(id);
}

function queueMicrotask(fn: () => void): void {
  //
}

function appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
  //
}

function appendChildToContainer(container: any, child: Instance | TextInstance) {
  //
}

function insertBefore(
  parentInstance: Instance,
  child: Instance | TextInstance,
  beforeChid: Instance | TextInstance | SuspenseInstance
): void {
  //
}

function insertInContainerBefore(
  container: Container,
  child: Instance | TextInstance,
  beforeChild: Instance | TextInstance | SuspenseInstance
): void {
  //
}

function removeChild(parentInstance: Instance, child: Instance | TextInstance | SuspenseInstance): void {
  //
}

function removeChildFromContainer(container: Container, child: Instance | TextInstance | SuspenseInstance): void {
  //
}

function resetTextContent(instance: Instance): void {
  //
}

function commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {
  //
}

function commitMount(instance: Instance, type: Type, props: Props, internalInstanceHandle: OpaqueHandle): void {
  //
}

function commitUpdate(
  instance: Instance,
  updatePayload: UpdatePayload,
  type: Type,
  prevProps: Props,
  nextProps: Props,
  internalHandle: OpaqueHandle
): void {
  //
}

function hideInstance(instance: Instance): void {
  //
}

function hideTextInstance(textInstance: TextInstance): void {
  //
}

function unhideInstance(instance: Instance): void {
  //
}

function unhideTextInstance(textInstance: TextInstance): void {
  //
}

function clearContainer(container: Container): void {
  //
}

const isAppElement = (element: any): element is RootElement => element instanceof RootElement;
const isRouterElement = (element: any): element is RouterElement => element instanceof RouterElement;
const isRouteElement = (element: any): element is RouteElement => element instanceof RouteElement;
const isStaticElement = (element: any): element is StaticElement => element instanceof StaticElement;
