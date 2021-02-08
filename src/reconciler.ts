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
type TimeoutHandle = any;
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
  createInstance(type: Type, props: Props, rootContainer: Container, hostContext: HostContext, internalHandle: OpaqueHandle): Instance {
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
  },
  createTextInstance(text: string, rootContainer: Container, hostContext: HostContext, internalHandle: OpaqueHandle): TextInstance {
    return text;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    if (isAppElement(child)) {
      throw new Error("Router cannot be inside.");
    }
    if (isAppElement(parentInstance) || isRouterElement(parentInstance)) {
      if (isRouterElement(child) || isStaticElement(child)) {
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
  },
  finalizeInitialChildren(instance: Instance, type: Type, props: Props, rootContainer: Container, hostContext: HostContext): boolean {
    return false;
  },
  prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContedxt): UpdatePayload | null {
    //
  },
  shouldSetTextContent(type, props): boolean {
    return false;
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    //
  },
  getChildHostContext(parentHostContext: HostContext, type: Type, rootContainer: Container): HostContext {
    //
  },
  getPublicInstance(instance: Instance | TextInstance): PublishInstance {
    //
  },
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    return null;
  },
  resetAfterCommit(containerInfo: Container): void {
    //
  },
  preparePortalMount(containerInfo: Container): void {
    //
  },
  now(): number {
    return Date.now();
  },
  scheduleTimeout(fn: (...args: unknown[]) => unknown, delay?: number): TimeoutHandle {
    //
  },
  cancelTimeout(id: TimeoutHandle): void {
    //
  },
  noTimeout: false,
  queueMicrotask(fn: () => void): void {
    //
  },
  isPrimaryRenderer: true,
  appendChild(parentInstance, child): void {
    //
  },
  appendChildToContainer(container: any, child) {
    if (isAppElement(child)) {
      container = child;
    }
  },
  insertBefore(parentInstance: Instance, child: Instance | TextInstance, beforeChid: Instance | TextInstance | SuspenseInstance): void {
    //
  },
  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance | SuspenseInstance
  ): void {
    //
  },
  removeChild(parentInstance: Instance, child: Instance | TextInstance | SuspenseInstance): void {
    //
  },
  removeChildFromContainer(container: Container, child: Instance | TextInstance | SuspenseInstance): void {
    //
  },
  resetTextContent(instance: Instance): void {
    //
  },
  commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {
    //
  },
  commitMount(instance: Instance, type: Type, props: Props, internalInstanceHandle: OpaqueHandle): void {
    //
  },
  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ): void {
    //
  },
  hideInstance(instance: Instance): void {
    //
  },
  hideTextInstance(textInstance: TextInstance): void {
    //
  },
  unhideInstance(instance: Instance): void {
    //
  },
  unhideTextInstance(textInstance: TextInstance): void {
    //
  },
  clearContainer(container: Container): void {
    //
  },
});

const isAppElement = (element: any): element is RootElement => element instanceof RootElement;
const isRouterElement = (element: any): element is RouterElement => element instanceof RouterElement;
const isRouteElement = (element: any): element is RouteElement => element instanceof RouteElement;
const isStaticElement = (element: any): element is StaticElement => element instanceof StaticElement;
