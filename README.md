# React Native - Redux toolkit tree - boilerplate

## Tech Stack

- React Native
- React Navigation 5
- Redux-toolkit
- TypeScript
- Flipper-ready
- Reactotron-ready
- Codepush
- Sentry
- .ENV
- Husky
- Eslint + prettier
- Code generator

## Features

- Basic Authentication
- Redux API thunk (A thunk middleware to communicate with API and redux-toolkit)
- Requesting / Request success / Request failure are handled automatically
- Basic CRUD with redux-thunk are handled automatically  
- Global Error handler
- Global App Notification
- 

## Quick Start

Install:

```bash
# Clone the template
yarn create rn-redux-toolkit-boilerplate YourApp
# Rename project & bundle identifier of android (For iOS, please use xCode)
npx react-native-rename "Hello World" -b com.yourorganization.helloword
# Remove cache
watchman watch-del-all
yarn start --reset-cache
# Install pod deps
cd ios && pod install

```

Usage:
```bash
# iOS
yarn ios
# android
yarn android
# clear cache
yarn clean
# lint
yarn lint
# Build APK android production:
yarn build-production:android
```

## Generators
Support redux modules by default, feel free to add your own code template

```
yarn generate
```

## Configuration

### Codepush
Use codepush cli to generate codepush keys for `staging` & `production` 
- ios: Open Xcode. Build settings -> User-defined -> CODEPUSH_KEY
- android: android/app/build.gradle -> BuildTypes block

### Sentry
- Add sentry DSN in .env file

### Other config
- `src/config/app-config`

