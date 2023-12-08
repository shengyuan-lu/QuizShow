import {
    Component,
    ElementRef,
    OnInit,
    OnDestroy,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";

import * as handTrack from "handtrackjs";

import { PredictionEvent } from "../../prediction-event";

@Component({
    selector: "app-handtracker",
    templateUrl: "./handtracker.component.html",
    styleUrls: ["./handtracker.component.css"]
})
export class HandtrackerComponent implements OnInit, OnDestroy {
    @Output() onPrediction = new EventEmitter<PredictionEvent>();
    @ViewChild("htvideo") video: ElementRef;

    SAMPLERATE: number = 1500;

    detectedGesture: string = "None";

    private model: any = null;
    private runInterval: any = null;

    isVideoPlaying: boolean = false;

    //handTracker model
    private modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.7 // confidence threshold for predictions.
    };

    constructor() {}

    ngOnInit(): void {
        handTrack.load(this.modelParams).then((lmodel: any) => {
            this.model = lmodel;
        });
    }

    ngOnDestroy(): void {
        this.model.dispose();
    }

    startVideo(): Promise<any> {
        return handTrack.startVideo(this.video.nativeElement).then(
            function (status: any) {
                return status;
            },
            (err: any) => {
                return err;
            }
        );
    }

    startDetection() {
        this.startVideo().then(
            () => {
                //The default size set in the library is 20px. Change here or use styling
                //to hide if video is not desired in UI.
                this.isVideoPlaying = true;
                this.video.nativeElement.style.height = "200px";

                this.runInterval = setInterval(() => {
                    this.runDetection();
                }, this.SAMPLERATE);
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    stopDetection() {
        this.isVideoPlaying = false;
        clearInterval(this.runInterval);
        handTrack.stopVideo(this.video.nativeElement);
    }

    /*
    runDetection demonstrates how to capture predictions from the handTrack library.
    It is not feature complete! Feel free to change/modify/delete whatever you need
    to meet your desired set of interactions
  */
    runDetection() {
        if (this.model != null) {
            let predictions = this.model.detect(this.video.nativeElement).then(
                (predictions: any) => {
                    if (predictions.length <= 0) return;

                    let openhands = 0;
                    let closedhands = 0;
                    let pointing = 0;
                    let pinching = 0;

                    for (let p of predictions) {
                        if (p.label == "open") openhands++;
                        if (p.label == "closed") closedhands++;
                        if (p.label == "point") pointing++;
                        if (p.label == "pinch") pinching++;
                    }

                    // These are just a few options! What about one hand open and one hand closed!?

                    if (openhands > 1) {
                        this.detectedGesture = "Two Open Hands";
                    } else if (openhands == 1) {
                        this.detectedGesture = "One Open Hand";
                    }

                    if (closedhands > 1) {
                        this.detectedGesture = "Two Closed Hands";
                    } else if (closedhands == 1) {
                        this.detectedGesture = "One Closed Hand";
                    }

                    if (openhands == 1 && closedhands == 1) {
                        this.detectedGesture = "One Open and One Closed Hands";
                    }

                    if (pointing > 1) {
                        this.detectedGesture = "Two Hands Pointing";
                    } else if (pointing == 1) {
                        this.detectedGesture = "One Hand Pointing";
                    }

                    if (openhands == 1 && pointing == 1) {
                        this.detectedGesture =
                            "One Open and One Pointing Hands";
                    }

                    if (pinching > 1) {
                        this.detectedGesture = "Two Hands Pinching";
                    } else if (pinching == 1) {
                        this.detectedGesture = "One Hand Pinching";
                    }

                    if (
                        openhands == 0 &&
                        closedhands == 0 &&
                        pointing == 0 &&
                        pinching == 0
                    ) {
                        this.detectedGesture = "None";
                    }

                    this.onPrediction.emit(
                        new PredictionEvent(this.detectedGesture)
                    );
                },
                (err: any) => {
                    console.error(err);
                }
            );
        } else {
            console.error("[handtrackerjs] no model");
        }
    }
}
