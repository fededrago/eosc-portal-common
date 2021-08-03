import {ComponentDocInfo} from "./component-doc-info.interface";

export const componentsDocsInfo = [
  {
    "name": "Configuration",
    "htmlDescription": `Global Common Components configuration. Allow overwrite partially.`,
    "parameters": [
      {
        "name": "gridBreakPoints",
        "htmlDescription": `
          JSON Object type with Bootstrap grid like view breakpoints for different devices.
          <br/>
          <a href="https://getbootstrap.com/docs/4.0/layout/grid/">More about Bootstrap grid system</a>
          
          <pre><code>
            /* DEFAULT VALUES IN PIXELS */
            {
                "sm": 576, // mobile screen
                "md": 768, // tablet screen
                "lg": 960, // desktop screen
                "xl": 1200 // large-desktop screen
            }
          </code></pre>
        `
      }
    ]
  },
  {
    "name": "Main header",
    "htmlDescription": `
      <p>Common EOSC header at top of the application.</p>
      <br/>
      
      <p>Additional logic</p>
      <ul>
        <li>Login when user name and user surname is set</li>
        <li>Choose between loginUrl property and onLogin trigger to log in</li>
        <li>Choose between logoutUrl property and onLogout trigger to log out</li>
      </ul>
    `,
    "parameters": [
      {
        "name": "username",
        "htmlDescription": "A full name of a logged in user"
      },
      {
        "name": "login-url",
        "htmlDescription": "URL to which the login btn will redirect"
      },
      {
        "name": "logout-url",
        "htmlDescription": "URL to which the logout btn will redirect"
      }
    ],
    "functions": [
      {
        "name": "(on-login)",
        "htmlDescription": "function triggered on login btn click"
      },
      {
        "name": "(on-logout)",
        "htmlDescription": "function triggered on logout btn click"
      }
    ],
    "examples": [
      {
        "title": "A user is logged",
        "htmlTag": `
          <eosc-common-main-header 
            username=\"name surname\" 
            login-url=\"https://marketplace.eosc-portal.eu/users/auth/checkin\" 
            logout-url=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-common-main-header>
        `
      },
      {
        "title": "The user isn't logged in",
        "htmlTag": `
          <eosc-common-main-header
            username=\"\"
            login-url=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
            logout-url=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-common-main-header>
        `
      },
      {
        "title": "Handle onLogin with event argument (substitute of loginUrl)",
        "htmlTag": `
          <eosc-common-main-header
            username=\"\"
            (on-login)=\"alert($event.type + 'on login btn')\"
            logout-url=\"https://marketplace.eosc-portal.eu/users/logout\"
          ></eosc-common-main-header>
        `
      },
      {
        "title": "Handle onLogout with event argument (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-common-main-header
            username=\"name surname\"
            (on-logout)=\"alert($event.type + ' on logout btn')\"
            login-url=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-common-main-header>
        `
      },
      {
        "title": "Handle onLogout without event argument (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-common-main-header
            username=\"name surname\"
            (on-logout)=\"alert('logout btn')\"
            login-url=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-common-main-header>
        `
      },
      {
        "title": "Handle multiple callbacks in onLogout (substitute of logoutUrl)",
        "htmlTag": `
          <eosc-common-main-header
            username=\"name surname\"
            (on-logout)=\"alert('logout btn'); alert('second call'); alert($event.type)\"
            login-url=\"https://marketplace.eosc-portal.eu/users/auth/checkin\"
          ></eosc-common-main-header>
        `
      }
    ]
  },
  {
    "name": "Main footer",
    "htmlDescription": `Common EOSC footer at bottom of the application.`,
    "examples": [
      {
        "title": "A user is logged",
        "htmlTag": `<eosc-common-main-footer></eosc-common-main-footer>`
      }
    ]
  }
] as any as ComponentDocInfo[];
