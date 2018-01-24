import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface CameraButtonProps {
    buttonClass: string;
    className?: string;
    glyphIcon: string;
    onClickAction?: () => void;
    buttonLabel: string;
    caption: string;
}

export class CameraButton extends Component<CameraButtonProps, {}> {
    render() {
        return createElement("span", {
            className: classNames(this.props.buttonClass),
            onClick: this.props.onClickAction
        },
            this.createIcon(this.props.buttonLabel, this.props.glyphIcon, this.props.caption)
        );
    }

    private createIcon(buttonLabel: string, glyphiconName: string , caption: string) {
        return(caption === "icons")
            ? createElement("span", { className: classNames(`glyphicon glyphicon-${glyphiconName}`) })
            : createElement("button", { className: classNames("btn btn-inverse active") }, buttonLabel);
    }
}
