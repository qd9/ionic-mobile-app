How to download install and Run this project.

1. Tools to install
    Node.js : download latest version 8 from https://nodejs.org/en/
    Ionic and cordova: Follow directions from https://ionicframework.com/getting-started/
    Download Android Studio : https://developer.android.com/studio/index.html
    Download android sdks from android studio sdk manager
    Create simulators from Android studio avd manager
    Similarly need to download and install Xcode, IOS sdk and Simulators but if on windows, we will have to use a tool like hockey or ionic view.

2. Download project from repo and run 'npm install' in the project directory

Suggestions:

1. Always use Ionic command line utility to generate pages, modules, pipes, directives etc. to maintain consistency in naming and folder structure.
  'ionic generate page pageName'
2. Observe the separation of concern shown in the Providers (user.ts and settings.ts) to write your providers and make use of it.Actual implementation may change based on our need.

Plugins:

1. Geolocation
    ionic cordova plugin add cordova-plugin-mauron85-background-geolocation
    ionic cordova plugin add cordova-plugin-geolocation
    npm install --save @ionic-native/geolocation
    npm install --save @ionic-native/background-geolocation

2. Device
    ionic cordova plugin add cordova-plugin-device
    npm install --save @ionic-native/device

3. Background-mode
    ionic cordova plugin add cordova-plugin-background-mode
    npm install --save @ionic-native/background-mode

TBD:
1. Add git guidelines
