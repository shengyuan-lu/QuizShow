import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { PredictionEvent } from "../../prediction-event";
import { QuizComponent } from "../quiz-component/quiz.component";

@Component({
    selector: "app-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit, AfterViewInit {
    @ViewChild(QuizComponent) quizComponent: QuizComponent;

    gesture: string = "None";

    basicGestureToAction: { [key: string]: string } = {
        "One Open Hand": "Loop Through Options",
        "One Hand Pinching": "Show/Hide Hint",
        "Two Closed Hands": "Submit Answer",
        "Two Open Hands": "Next Question",
        "Two Hands Pointing": "Restart Quiz"
    };

    customGestureToAction: { [key: string]: string } = {
        "One Open and One Closed Hands": "Force Skip Question",
        "One Open and One Pointing Hands": "Force Exit Quiz"
    };

    actionFromGesture(gesture: string): string | undefined {
        // check if key in dictionary:
        if (gesture in this.basicGestureToAction) {
            return this.basicGestureToAction[gesture];
        } else if (gesture in this.customGestureToAction) {
            return this.customGestureToAction[gesture];
        } else {
            return "No Action Assigned";
        }
    }

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {}

    prediction(event: PredictionEvent) {
        this.gesture = event.getPrediction();

        switch (this.gesture) {
            case "One Open Hand":
                this.quizComponent.loopThroughOptions();
                break;
            case "One Hand Pinching":
                this.quizComponent.toggleHint();
                break;
            case "Two Closed Hands":
                this.quizComponent.submitAnswer();
                break;
            case "Two Open Hands":
                this.quizComponent.loadNextQuestion(false);
                break;
            case "Two Hands Pointing":
                this.quizComponent.restartQuiz();
                break;
            case "One Open and One Closed Hands":
                this.quizComponent.loadNextQuestion(true);
                break;
            case "One Open and One Pointing Hands":
                this.quizComponent.forceExitQuiz();
                break;

            default:
                break;
        }
    }

    protected readonly Object = Object;
}
