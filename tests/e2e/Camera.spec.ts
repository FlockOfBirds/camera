import webCam from "./pages/webcam.page";

describe("Camera", () => {
    it("should display webcam", () => {
        webCam.open();
        webCam.webCam.waitForVisible();
        const video = webCam.webCam.isExisting();

        expect(video).toBeTruthy();
    });

    it("should take photo when 'take picture' button is clicked", () => {
        webCam.open();
        webCam.webCam.waitForVisible();
        webCam.takePictureButton.waitForVisible();
        webCam.takePictureButton.click();

        expect(webCam.image).toBeTruthy();
    });

    it("should retake photo when 'retake picture' button is clicked", () => {
        webCam.open();
        webCam.webCam.waitForVisible();
        webCam.takePictureButton.click();
        webCam.imageElement.waitForVisible();
        webCam.webCam.waitForVisible();
        webCam.takePictureButton.click();

        const videoStream = webCam.webCam.isExisting();

        expect(videoStream).toBeTruthy();
    });
});
