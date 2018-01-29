import { Component, createElement } from "react";

import { Camera, CameraState } from "./components/Camera";
import { CameraContainerProps, ModelerProps } from "./components/CameraContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<CameraContainerProps, CameraState> {
    constructor(props: CameraContainerProps) {
        super(props);

    }

    render() {
        return createElement(Camera as any, {
            ...this.props as ModelerProps,
            filter: () => this.setFilter()
            // onClickAction: () => { return; }
        });
    }

    private setFilter(): string {
        if (this.props.imageFilter === "grayscale") {
            return "grayscale(1)";
        } else if (this.props.imageFilter === "sepia") {
            return "sepia(1)";
        } else
            return "none";
    }
}

export function getPreviewCss() {
    return require("./ui/Camera.scss");
}

// visibility props are missing.
export function getVisibleProperties(valueMap: any, visibilityMap: any) {
    visibilityMap.customCameraDimensions = valueMap.cameraDimensions === "custom";

    return visibilityMap;
}
