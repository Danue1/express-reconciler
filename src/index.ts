import { Reconciler } from "./reconciler";

export * from "./commons";
export * from "./internalMiddlewares";

export const start = (app: JSX.Element): void => {
  const container = Reconciler.createContainer(null, 0, false, null);
  Reconciler.updateContainer(app, container, null, () => null);
};

export default { start };
