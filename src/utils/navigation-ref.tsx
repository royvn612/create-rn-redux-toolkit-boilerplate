import * as React from 'react';

export default class NavigationRef {
  static navigationRef = React.createRef<any>();

  static navigate(name: string, params: any) {
    this.navigationRef.current?.navigate(name, params);
  }
}
