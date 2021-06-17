import "./index.scss";
import {MainHeader} from "./src/main-header/main-header";

const COMPONENTS = [MainHeader]
window.addEventListener("load", () => {
    COMPONENTS.forEach(component => component._render())
});