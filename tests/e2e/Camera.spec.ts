import HomePage from "./pages/home.page";

describe("Camera", () => {

    it("should render the structure correctly", () => {
        HomePage.open();
    });

    it("should render an alert when browser does not support the widget", () => {
//
    });

    describe("with take picture/camera button clicked", () => {
        it("should render the picture", () => {
//
        });

        it("should call take picture method", () => {
//
        });
    });

    describe("with multiple media devices", () => {
        it("should render with 'switch icon'", () => {
//
        });

        it("should render with 'switch button'", () => {
//
        });

        it("should switch/swap camera when switch camera button is clicked", () => {
//
        });
    });

    describe("with icons configuration", () => {
        it("should render with the correct 'capture icon'", () => {
//
        });

        it("should render with the correct 'retake icon'", () => {
//
        });

        it("should render with the correct 'save icon'", () => {
//
        });
    });

    describe("with buttons configuration", () => {
        it("should render with 'capture button'", () => {
//
        });

        it("should render with 'retake button'", () => {
//
        });

        it("should render with 'save button'", () => {
//
        });
    });

    it("should render webcam when retake button is clicked", () => {
//
    });
});
