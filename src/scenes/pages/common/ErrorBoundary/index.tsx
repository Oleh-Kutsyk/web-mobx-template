import React from 'react';

import { useNavigation } from '../../../../hooks';

import { PageTitle } from '../../../../components/pageTitle';
import { Button } from '../../../../components/button';

import * as Styled from './styled';

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
      <Styled.Root>
        <PageTitle>Oops, something went wrong</PageTitle>
        <Button color='inherit' onClick={this.props.goBackNavigate}>
          Go Back
        </Button>
      </Styled.Root>
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
