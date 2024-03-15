# RepXcel Mobile Application
## Install dependencies
`npm i`

## Running the application
`npx expo start`

## Documentation
- [Expo Go Documentation](https://expo.dev/client)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [BLE PLX Module](https://dotintent.github.io/react-native-ble-plx/)\
- [BLE Sample Expo](https://github.com/friyiajr/BLESampleExpo)

## Running for Android
`npx expo prebuild`

for emulator: `npx expo run:android`
for running on phone: `eas build --profile development --platform android` then `npx expo start --dev-client` 

## Installing AWS Amplify CLI
`npm install -g @aws-amplify/cli`

### AWS Amplify CLI Commands
`amplify add <category>` will allow you to add features like user login or a backend API
`amplify push` will build all your local backend resources and provision it in the cloud
`amplify console` to open the Amplify Console and view your project status
`amplify publish` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

#### AWS Amplify Note
`import '@azure/core-asynciterator-polyfill';` is required at entry point of app