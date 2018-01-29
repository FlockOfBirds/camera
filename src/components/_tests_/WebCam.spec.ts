import { shallow } from "enzyme";
import { createElement } from "react";
import { WebCam, WebCamProps } from "../WebCam";

describe("WebCam", () => {
    const shallowRenderCamera = (props: WebCamProps) => shallow(createElement(WebCam, props));
    const defaultProps: WebCamProps = {
        ref: (camContainer: HTMLDivElement) => {
            camContainer = camContainer;
        },
        filter: "sepia",
        fileType: "jpeg",
        style: { }
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
