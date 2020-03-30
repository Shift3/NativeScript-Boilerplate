# SP-NativeScript
This is Template NativeScript project used for S&amp;P

# Steps to generate NativeScript project:  
- Go through setp steps in https://docs.nativescript.org/angular/start/quick-setup.
- Run ```tns create my-angular-app --ng``` (To create a new nativescript project).
- Run ```cd my-angular-app``` (To enter prject folder).
- Run ```tns doctor``` (To check status).
  Note: If you found some module is not up to date you should run ```tns migrate``` then ```tns update```.
- Run ```update tns-android``` and ```update tns-ios``` version to latest
- ```npm install -g nativescript@latest```
- Run ```ng generate component login``` (To create login component).
- Run the app using one of the following commands:  
```tns debug iOS```     or    ```tns debug android```.  

# Steps to include unit test:  
Note: Unit Test NS using the following frameworks (JASMINE, MOCHA and QUNIT) to write and execute tests, NS using Karma server to run unit test.  

- Run ```tns test init```  (This command should generate src/tests/example.ts and create karma server on the root of project).
- Run ```npm i @types/mocha --save-dev``` (to enable write unit test for typescript/angular).

Note: I found there is need to do the following steps:  
- Run this command ```npm i net -S```
- Fixed build issue by opening webpack.config.js file then add this property {"child_process": "empty" } to ```node:```  
- To enable console log in terminal page open Karma.config.js then add ```client: {
      captureConsole: true
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

# Links and References:  
https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular  
https://docs.nativescript.org/tooling/testing/testing
https://github.com/SBats/tns-circleci-example/tree/master/circle-ci-setup
