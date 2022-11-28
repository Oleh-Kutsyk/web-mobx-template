type TArgs = Array<unknown>;
type TExpression =
  | boolean
  | string
  | number
  | null
  | undefined
  | symbol
  | TAnyObject
  | Array<unknown>;

type TLogOnDevelopmentMode = {
  expression?: TExpression;
  type: keyof Console;
  args?: TArgs;
};

const logOnDevelopmentMode = (args: TLogOnDevelopmentMode) => {
  if (ENV_IS_PRODUCTION) {
    return;
  }

  const shouldLog = args.expression ? Boolean(args.expression) : true;

  if (shouldLog) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console[args.type](args.args);
  }
};

export type TDevLoggerService = InstanceType<typeof DevLoggerService>;
export class DevLoggerService {
  public assert(expression: TExpression, ...args: TArgs): void {
    logOnDevelopmentMode({
      expression,
      type: 'error',
      args,
    });
  }

  public log(...args: TArgs): void {
    logOnDevelopmentMode({
      type: 'log',
      args,
    });
  }

  public warn(...args: TArgs): void {
    logOnDevelopmentMode({
      type: 'warn',
      args,
    });
  }

  public error(...args: TArgs): void {
    logOnDevelopmentMode({
      type: 'error',
      args,
    });
  }

  public group(...args: TArgs): void {
    logOnDevelopmentMode({
      type: 'group',
      args,
    });
  }

  public groupEnd(): void {
    logOnDevelopmentMode({
      type: 'groupEnd',
    });
  }
}

export const devLoggerService = new DevLoggerService();
