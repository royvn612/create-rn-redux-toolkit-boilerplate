/* eslint-disable no-console */
// @ts-nocheck
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';
import {clear} from '~/utils/storage';
import {reactotronConfig as config} from '~/config';

const noop = () => undefined;

if (__DEV__) {
  console.tron = Reactotron; // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    benchmark: noop,
    clear: noop,
    close: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    onCustomCommand: noop,
    overlay: noop,
    reportError: noop,
    send: noop,
    startTimer: noop,
    storybookSwitcher: noop,
    use: noop,
    useReactNative: noop,
    warn: noop,
  };
}

// eslint-disable-next-line import/no-mutable-exports
let reactotron = Reactotron.configure({
  name: config.name || require('../../package.json').name,
  host: config.host,
});

// hookup middleware
if (config.useAsyncStorage) {
  reactotron = reactotron.setAsyncStorageHandler(AsyncStorage);
}
reactotron = reactotron.useReactNative({
  asyncStorage: config.useAsyncStorage ? undefined : false,
});
reactotron = reactotron.use(reactotronRedux());
reactotron = reactotron.connect();

// Register Custom Commands
reactotron.onCustomCommand({
  title: 'Clear Async Storage',
  description: 'Clear Async Storage',
  command: 'resetStore',
  handler: () => {
    console.tron.log('Clear Async Storage');
    clear();
  },
});

// clear if we should
if (config.clearOnLoad) {
  reactotron.clear();
}

export default reactotron;
