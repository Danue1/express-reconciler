import Express, { ParameterContext, ResponseBuilder } from "../../src";

Express.start(<App port={8080} />);

interface Props {
  readonly port: number;
}

function App({ port }: Props) {
  const print = (port: number): void => {
    console.clear();
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

  return (
    <app port={port} onListen={print}>
      <get path="/" controller={hello} />
      <get path="/:name" controller={name} />
    </app>
  );
}
