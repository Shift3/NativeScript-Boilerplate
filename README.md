# SP-NativeScript
This is Template NativeScript project used for S&amp;P

# Steps to generate NativeScript project:  

- tns create my-angular-app --ng
- cd my-angular-app
- tns doctor (Sometimes need to do tns update)
- update tns-android and tns-ios version to latest
- npm install -g nativescript@latest
- ng generate component login
- Run the app using one of the following commands:  
```tns debug iOS —bundle```     or    ```tns debug android —bundle```.  

# Steps to include unit test:  
Note: Unit Test NS using the following frameworks (JASMINE, MOCHA and QUNIT) to write and execute tests, NS using Karma server to run unit test.  

- tns test init  (This command should generate src/tests/example.ts and create karma server on the root of project).
- npm i @types/mocha --save-dev (to enable write unit test for typescript/angular).

Note: I found there is need to run the following steps:  
- Run this command ```npm i net -S```
- Fixed build issue by opening webpack.config.js file then add this property {"child_process": "empty" } to ```node:```  
- To enable console log in terminal page open Karma.config.js then add ```client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },```   

- Run the test using on of the following commands:  
```tns test iOS```     or    ```tns test android```.  

# Setup CircleCI:  
- Signup/Login to circleci.
- Select this project then hit Set up Project.
- Select macOS operating system then Other language.
- Configure your .circleci/config.yml then click on Start Building.  

Note: You need macOS plan to run this on circleci.  
Note: Protect master branch on github by going to settings then check out ```Require status check...``` then select ```CircleCI```.  

# Versioning:  
- V1.0.0
    Fixed free row get one badge only
    Fixed free row interval base type
    Fixed issue with undefined stroke HR
    Fixed format of integer values
    Fixed delay switching between metrics
    Fixed crashes on long workouts and improve performance
    Fixed HIIT training getting badges
- V1.0.1
    Free row now only awards 1 workout badge
    Free row now supports displaying time or distance in the UI based on current interval type
    Fixed malformed error when uploading to Concept2 Logbook
    Fixed delay when switching between workout metrics
    Fixed crashes on long workouts and improve performance on android
    Fixed data issues when reporting to Concept2 Logbook
    Added support for Heart Rate on Concept2 Logbook and fixed other heart rate issues
    Fixed issue with HIIT not awarding badge when target was beaten
    Conditioning Program now shows target in workout screen for weeks 2-6
    Row Forge now sends verified workouts to Concept2 Logbook
    Improved keyboard behavior on iOS forms
    Fixed screen sometimes falling asleep on subsequent workouts
    Fixed an issue with second workout doesn't load.
    Fixed an issue with time format.
    Fixed an issue with shared badges give wrong name.
# Links and References:  
https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular  
https://docs.nativescript.org/tooling/testing/testing
https://github.com/SBats/tns-circleci-example/tree/master/circle-ci-setup