// @Documentation({
//   description: `
//     <p>Common EOSC header at top of the application.</p>
//     <br/>
//
//     <p>Additional logic</p>
//     <ul>
//       <li>Login when user name and user surname is set</li>
//       <li>Choose between loginUrl property and onLogin trigger to log in</li>
//       <li>Choose between logoutUrl property and onLogout trigger to log out</li>
//     </ul>
//   `,
//   targetFileName: "main-header",
//   parameters: [
//     {
//       name: "username",
//       htmlDescription: "A full name of a logged in user"
//     },
//     {
//       name: "login-url",
//       htmlDescription: "URL to which the login btn will redirect"
//     },
//     {
//       name: "logout-url",
//       htmlDescription: "URL to which the logout btn will redirect"
//     },
//     {
//       name: "auto-login",
//       htmlDescription: "Auto login feature login automatically to AAI, if user has logged in any service using Common Components. By default auto login is on"
//     }
//   ],
//   functions: [
//     {
//       name: "(on-login)",
//       htmlDescription: "function triggered on login btn click"
//     },
//     {
//       name: "(on-logout)",
//       htmlDescription: "function triggered on logout btn click"
//     }
//   ]
// })