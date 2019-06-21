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
- Open webpack.config.js file then add this property {"child_process": "empty" } to ```node:```

- Run the test using on of the following commands:  
```tns test iOS```     or    ```tns test android```.  

# Links and References:  
https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular  
https://docs.nativescript.org/tooling/testing/testing