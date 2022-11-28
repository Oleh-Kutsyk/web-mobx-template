# Contributing to Trade+

## Code conventions

### 1. Please put all imports to file in right order, use next pattern

```text
[imports for all external libraries]
[imports for all internal dependencies: actions, utils, constants, etc.]
[imports for all components]
[imports for all styles]
```

### 2. Interface should start with [I] symbol.

**Wrong:**

```ts
interface User {
	firstName: string;
	lastName: string;
}
```

**Right:**

```ts
interface IUser {
	firstName: string;
	lastName: string;
}
```

### 3. Types should start with [T] symbol.

**Wrong:**

```ts
type User = {
	firstName: string;
	lastName: string;
};
```

**Right:**

```ts
type TUser = {
	firstName: string;
	lastName: string;
};
```

### 4. Enum must starts with [E] symbol.

**Wrong:**

```ts
enum Color {
	red = 'red',
	blue = 'blue',
}
```

**Right:**

```ts
enum EColor {
	red = 'red',
	blue = 'blue',
}
```

### 5. Component props should have [IProps] suffix or usually [IProps].

**Wrong:**

```ts
  interface IButton { ... }

  const Button:React.FC = <IProps>(props) => { ... }
```

**Right:**

```ts
  interface IProps { ... }
  const Button:React.FC = <IProps>(props) => { ... }
```

### 6. Event Handlers must have [handle] prefix and with name of event on the end.

**Wrong:**

```ts
  <button onClick={sendForm}>
```

**Right:**

```ts
<button onClick={handleButtonClick} />
```

### 7. Avoid [export default].

**Wrong:**

```ts
export default MyComponent;
```

**Right:**

```ts
export const MyComponent;
export const Styled = { Container, Popup };
export const StyledTable = { Container, Wrapper, Table };
```

### 8. Functions that return html should have [render] prefix.

**Wrong:**

```ts
  const Button:React.FC = <IProps>(props) => {
      const getLabel = () => <div>{props.label}</div>
        ...
  }
```

**Right:**

```ts
  const Button:React.FC = <IProps>(props) => {
      const renderLabel = () => <div>{props.label}</div>
        ...
  }
```

### 9. Write hooks into top of the Functional component.

**Wrong:**

```ts
  const Input:React.FC = <IProps>(props) => {
      const getLabel = () => <div>{props.label}</div>
        ...
      const [state, setState] = useState<IState>({});
  }
```

**Right:**

```ts
  const Input:React.FC = <IProps>(props) => {
      const [state, setState] = useState<IState>({});

      const getLabel = () => <div>{props.label}</div>
  ...
  }
```

### 10. If function has closure - add correctly name ( like create...Handler or onCreate...Handler)

**Wrong:**

```ts
  <div onClick={handleSort('firstName')}>...</>
  <div onClick={handleSort('lastName')}>...</>
```

**Right:**

```ts
  <div onClick={createSortHandler('firstName')}>...</>
  <div onClick={createSortHandler('lastName')}>...</>
```

### 11. Combine multiple states into one if it have small structure

**Wrong:**

```ts
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [age, setAge] = useState(1);
```

**Right:**

```ts
  interface IState {
    firstName:string;
    lastName:string;
    age:number;
  }
  const [state,setState] = useState<IState>({firstName:'',lastName:'',age:1});
  and setState({...state,firstName:'1'})
```

### 12. If your component has only 1 state, create interface for it.

Because in future this state can extend and you must rewrite/rewrite code.

**Wrong:**

```ts
const [counter, setCounter] = useState(0);
```

**Right:**

```ts
interface IState {
	counter: number;
}
const [state, setState] = useState<IState>({ counter: 1 });
```

### 13. Put all important data into top of the file

Because in future this state can extend and you must rewrite/rewrite code.
It's better when you read code. First you read arguments, then you read state.
Usually you not interested on any realization, and you scroll to component body.

**Wrong:**

```ts
  interface IProps {...}

  const renderTitle = () => {}
  const renderBody = () => {}

  interface IState {...}

  export const Table : (props:IProps) {...}
```

**Right:**

```ts
  interface IProps {...}
  interface IState {...}

  export const Table : (props:IProps) {...}
  // Put any internal methods or less important code after component body.
  const renderTitle = () => {}
  const renderBody = () => {}
```

### 14. Avoid 'Component' suffix or 'Comp' into Component names

**Wrong:**

```ts
  export const ButtonComponent : (props:IProps) {...}
  export const ButtonComp : (props:IProps) {...}
```

**Right:**

```ts
  export const Button : (props:IProps) {...}
```

### 15. In styled component use conditionApply util if need check more then 1 case

**Wrong:**

```ts
  export const Button = styled(CoreButton)`
    ${props => (props.isOpen
      ? props.isError
        : `color: ${props.theme.grey[300]} `
      : '')};
  `;
```

**Right:**

```ts
    export const Button = styled(CoreButton)`
    ${({isOpen, isError, theme}) => `
      ${conditionApply([isFocus, isError],
      `
        color: ${theme.grey[300] };
      `
    )}
  `;
```
