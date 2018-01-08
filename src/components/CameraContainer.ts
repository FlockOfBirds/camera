import { Component, createElement } from "react";

interface WrapperProps {
    mxObject: mendix.lib.MxObject;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    photo: string;
}

export default class CameraContainer extends Component<ContainerProps> {

    constructor(props: ContainerProps) {
        super(props);

    }

    render() {
        return createElement("div", { });
    }
}
