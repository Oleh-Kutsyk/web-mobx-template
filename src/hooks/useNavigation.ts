import {
  useNavigate,
  NavigateFunction,
  useParams,
  Params,
  useLocation,
  Location,
} from 'react-router-dom';

interface IReturnNavigation<
  TP extends string | Record<string, string | unknown> = string
> {
  navigate: NavigateFunction;
  goBackNavigate: () => void;
  params: Readonly<[TP] extends [string] ? Params<TP> : Partial<TP>>;
  location: Location;
}

const goPageBack = -1;

export function useNavigation<
  TP extends string | Record<string, string | undefined> = string
>(): IReturnNavigation<TP> {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<TP>();

  const goBackNavigate = () => {
    navigate(goPageBack);
  };

  return {
    navigate,
    goBackNavigate,
    params,
    location,
  };
}
