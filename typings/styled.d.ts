/* eslint-disable @typescript-eslint/naming-convention */ // Fix DefaultTheme from 'styled-components' library
import 'styled-components';
import { ITheme } from '../src/themes';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
