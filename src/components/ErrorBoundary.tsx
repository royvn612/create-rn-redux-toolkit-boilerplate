import React from 'react';
import {Alert} from 'react-native';
import AppError from '~/utils/error-handler';

// Temporary use class since react hooks don't support componentDidCatch yet
class ErrorBoundary extends React.Component {
  errorShown: any;

  componentDidCatch(error: Error) {
    if (__DEV__) {
      new AppError(error);
      Alert.alert('', 'An unexpected error has occurred. Please restart to continue.');
      return;
    }
    // to prevent multiple alerts shown to your users
    if (this.errorShown) {
      return;
    }
    this.errorShown = true;
    new AppError(error);
    Alert.alert('', 'An unexpected error has occurred. Please restart to continue.');
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {children} = this.props;
    return children;
  }
}

export default ErrorBoundary;
