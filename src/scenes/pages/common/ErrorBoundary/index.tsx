import React from 'react';

import { useNavigation } from 'src/hooks';

// import * as Styled from './styled';

interface IErrorBoundaryPageProps {
  children: React.ReactNode;
  goBackNavigate?: () => void;
}

interface IErrorBoundaryPageState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  IErrorBoundaryPageProps,
  IErrorBoundaryPageState
> {
  constructor(props: IErrorBoundaryPageProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    _error: unknown
  ): Partial<IErrorBoundaryPageState> {
    return { hasError: true };
  }

  onClickRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div>
        <h1>Oops, something went wrong</h1>
        <button type='button' onClick={this.props.goBackNavigate}>
          Go Back
        </button>
      </div>
    );
  }
}

export const WithErrorBoundary: React.FC<IErrorBoundaryPageProps> = props => {
  const { goBackNavigate } = useNavigation();

  return (
    <ErrorBoundary {...props} goBackNavigate={goBackNavigate}>
      {props.children}
    </ErrorBoundary>
  );
};
