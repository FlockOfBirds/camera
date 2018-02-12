import { shallow } from "enzyme";
import { createElement } from "react";
import { WebCam, WebCamProps } from "../WebCam";

describe("WebCam", () => {
    const shallowRenderCamera = (props: WebCamProps) => shallow(createElement(WebCam, props));
    const defaultProps: WebCamProps = {
        fileType: "jpeg",
        filter: "sepia",
        height: 60,
        ref: (camContainer: HTMLDivElement) => {
            camContainer = camContainer;
        },
        style: {},
        width: 45
    };

    it("should render the structure correctly", () => {
        const renderCamera = shallowRenderCamera(defaultProps);

        expect(renderCamera).toBeElement(
            createElement("div", {
                style: { filter: defaultProps.filter }
            })
        );
    });
});
