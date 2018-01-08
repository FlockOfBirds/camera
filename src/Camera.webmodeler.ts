import { Component, createElement } from "react";

import { CameraState } from "./components/Camera";
import { ContainerProps } from "./components/CameraContainer";

// tslint:disable-next-line class-name
export class preview extends Component<ContainerProps, CameraState> {
    constructor(props: ContainerProps) {
        super(props);

    }

    render() {
        return createElement("div", { className: "div-class" }, "webmodeler");
    }
}
