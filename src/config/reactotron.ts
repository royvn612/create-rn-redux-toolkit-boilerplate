export interface ReactotronConfig {
  /** The name of the app. */
  name?: string;
  /** The host to connect to: default 'localhost'. */
  host?: string;
  /** Should we use async storage */
  useAsyncStorage?: boolean;
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean;
}

export const reactotronConfig: ReactotronConfig = {
  host: 'localhost',
  useAsyncStorage: true,
  clearOnLoad: true,
};
