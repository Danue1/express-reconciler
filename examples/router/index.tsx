import Express, { ResponseBuilder } from "../../src";

Express.start(<App port={8080} />);

interface Props {
  readonly port: number;
}

function App({ port }: Props) {
  const print = (): void => {
    console.clear();
    console.log(`[Express Reconciler] Server Running on ${port} Port.`);
  };

  return (
    <app port={port} onListen={print}>
      <GraphQLRouter />
      <VersionRouter />
    </app>
  );
}

const GraphQLRouter = () => {
  const graphql = (): ResponseBuilder => {
    return ResponseBuilder.of().body(`Hello, GraphQL Broadcast!`);
  };

  return (
    <router path="/graphql">
      <get path="/broadcast" controller={graphql} />
    </router>
  );
};

const VersionRouter = () => {
  const version = (): ResponseBuilder => {
    return ResponseBuilder.of().body("Hello, Version Broadcast!");
  };

  return (
    <router path="/version">
      <get path="/broadcast" controller={version} />
    </router>
  );
};
