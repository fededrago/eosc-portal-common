import {ComponentDocInfo} from "./component-doc-info.interface";

export const componentsDocsInfo = [
  {
    "name": "Main header",
    "htmlDescription": `
      <p>Common EOSC header at top of the application.</p>
      <br/>
      
      <p><b>Additional logic</b></p>
      <ul>
        <li>Login when user name and user surname is set</li>
        <li>Choose between loginUrl property and onLogin trigger to log in</li>
        <li>Choose between logoutUrl property and onLogout trigger to log out</li>
      </ul>
    `,
    "parameters": [
      {
        "name": "name",
        "htmlDescription": "The name of a logged in user"
      },
      {
        "name": "surname",
        "htmlDescription": "The surname of the logged in user"
      },
      {
        "name": "loginUrl",
        "htmlDescription": "URL to which the login btn will redirect"
      },
      {
        "name": "logoutUrl",
        "htmlDescription": "URL to which the logout btn will redirect"
      }
    ],
    "functions": [
      {
        "name": "onLogin",
        "htmlDescription": "function triggered on login btn click"
      },
      {
        "name": "onLogout",
        "htmlDescription": "function triggered on logout btn click"
      }
    ],
    "examples": [
      {
        "title": "A user is logged",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"name\" 
            surname=\"surname\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\" 
            logoutUrl=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "The user isn't logged in",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"\" 
            surname=\"\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\" 
            logoutUrl=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "The user isn't logged in",
        "htmlDescription": "<b>In the browser console will occur warnings.</b>",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"\" 
            surname=\"test2\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\" 
            logoutUrl=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "The user isn't logged in",
        "htmlDescription": "<b>In the browser console will occur warnings.</b>",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"test1\" 
            surname=\"\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\" 
            logoutUrl=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "Handle onLogin with event argument (substitute of loginUrl)",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"\" 
            surname=\"\" 
            (onLogin)=\"alert($event.type + 'on login btn')\" 
            logoutUrl=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "Handle onLogout with event argument (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"name\" 
            surname=\"surname\" 
            (onLogout)=\"alert($event.type + ' on logout btn')\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "Handle onLogout without event argument (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"name\" 
            surname=\"surname\" 
            (onLogout)=\"alert('logout btn')\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-commons-main-header>
        `
      },
      {
        "title": "Handle multiple callbacks in onLogout (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-commons-main-header 
            name=\"name\" 
            surname=\"surname\" 
            (onLogout)=\"alert('logout btn'); alert('second call'); alert($event.type)\" 
            loginUrl=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-commons-main-header>
        `
      }
    ]
  }
] as any as ComponentDocInfo[];
