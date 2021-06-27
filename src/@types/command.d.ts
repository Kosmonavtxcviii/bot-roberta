type CommandType = 'help';

interface CommandBase {
  type: CommandType;
  args: string[];
}

export interface Executable extends Pick<CommandBase, 'type'> {

}

// type InferExample<T> = T extends (...args: infer U) => infer V ? U extends Array<infer W> ? W : V : never;

// type Method = (foo: number, bar: string, baz: boolean) => object;

// //

// //

// type Foo = InferExample<Method>
