import Express, { ResponseBuilder } from "../../src";

const print = (port: number): void => {
  console.clear();
  console.log(`[Express Reconciler] Server Running on ${port} Port.`);
};

interface Props {
  readonly port: number;
}

const App = ({ port }: Props) => (
  <app port={port} onListen={print}>
    <GraphQLRouter />
    <VersionRouter />
  </app>
);

const graphql = (): ResponseBuilder => {
  return ResponseBuilder.of().body(`Hello, GraphQL Broadcast!`);
};

const GraphQLRouter = () => (
  <router path="/graphql">
    <get path="/broadcast" controller={graphql} />
  </router>
);

const version = (): ResponseBuilder => {
  return ResponseBuilder.of().body("Hello, Version Broadcast!");
};

const VersionRouter = () => (
  <router path="/version">
    <get path="/broadcast" controller={version} />
  </router>
);

Express.start(<App port={8080} />);
