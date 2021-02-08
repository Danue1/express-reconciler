import Express, { ParameterContext, ResponseBuilder } from "../src";

const print = (port: number): void => {
  console.log(`[Express Reconciler] Server Running on ${port} Port.`);
};

const hello = (): ResponseBuilder => {
  return ResponseBuilder.of().body("Hello, World!");
};

interface Parameter {
  readonly name: string;
}

const name = ({ params: { name } }: ParameterContext<Parameter>): ResponseBuilder => {
  return ResponseBuilder.of().body(`Hello, ${name}!`);
};

interface Props {
  readonly port: number;
}

const App = ({ port }: Props) => (
  <app port={port} onListen={print}>
    <get path="/" controller={hello} />
    <get path="/:name" controller={name} />
  </app>
);

Express.start(<App port={8080} />);
