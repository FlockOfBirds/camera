import webCam from "./pages/webcam.page";
import * as driver from "selenium-webdriver";

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

        const videor = webCam.webCam.isExisting();

        expect(videor).toBeTruthy();
    });

    it("should save photo when 'save picture' button is clicked", () => {
        webCam.open();
        webCam.webCam.waitForVisible();
        webCam.takePictureButton.click();
        webCam.imageElement.waitForVisible();
        webCam.savePicture.click();
        webCam.imageElement.waitForVisible();
        // popup.switchTo().alert();
        const popup = new driver.Builder()
        .forBrowser("chrome")
        .build();

        popup.sleep(100).then(() => {
        // popup.switchTo().alert();

        });
        popup.get("http://localhost:8080/p/Large");
        popup.switchTo().activeElement();
        popup.findElement(driver.By.name("button"));
                // tslint:disable-next-line:no-console
        // console.log(popup.findElement(driver.By.name("button")));
        // webCam.okPopUp.waitForVisible();
        const button = popup.findElement(driver.By.name("button"));
        button.getText().then((text: string) => {
            // tslint:disable-next-line:no-console
            console.log("Button text is" + text);
          });
        popup.findElement(driver.By.name("button")).click();

    });
});
