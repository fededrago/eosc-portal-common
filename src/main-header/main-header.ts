import {configuration, defaultConfiguration} from "./main-header.config";
import * as _ from 'lodash';

export class MainHeader {
    static _tag: string = "eosc-main-header";

    static _render() {
        const currentDomain = window.location.hostname;
        Array.from(document.getElementsByTagName(this._tag))
            .forEach(element => {
                if (!element) {
                    throw `${this._tag} tag couldn't be found in the HTML DOM`;
                }

                let navBtnsConfig = (configuration as any)[currentDomain];
                let isDemoMode = false;
                if (!navBtnsConfig) {
                    isDemoMode = true;
                    navBtnsConfig = defaultConfiguration;
                }

                let navBtns = navBtnsConfig
                    .filter((btn: any) => btn.label !== "login" && btn.label !== "logout")
                    .map((btn: any) => `<li><a href="${btn.url}">${_.upperFirst(btn.label)}</a></li>`).join("");
                const userName = element.getAttribute("name");
                const userSurname = element.getAttribute("surname");
                console.log(userName, userSurname);
                if (!!userName && !!userSurname) {
                    navBtns += `<li>${userName} ${userSurname}</li>`;
                    const logoutBtn = navBtnsConfig.find((btn: any) => btn.label === "logout");
                    navBtns += `<li><a href="${logoutBtn.url}">${_.upperFirst(logoutBtn.label)}</a></li>`;
                }
                else {
                    const loginBtn = navBtnsConfig.find((btn: any) => btn.label === "login");
                    navBtns += `<li id="logout-btn"><a href="${loginBtn.url}">${_.upperFirst(loginBtn.label)}</a></li>`;
                }
                const innerHTML = `
                    <nav class="top">
                        <div class="container">
                            <ul class="right-inks">
                                ${navBtns}
                            </ul>
                        </div>
                    </nav>
                `;
                element.innerHTML = innerHTML.trim();
            });
    }
}

