import { Component, createElement } from "react";

import "../ui/Camera.scss";

export interface CameraProps {
    style: string;
}

export interface CameraState {
    pictureTaken: boolean;
}

export class Camera extends Component<CameraProps, CameraState> {

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            pictureTaken: false
        };
    }

    render() {
        return createElement("div", { });
    }
}
