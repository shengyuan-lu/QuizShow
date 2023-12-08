import { Component, OnInit } from "@angular/core";
import { QuizQuestion } from "../../data/quiz-question";
import { QuizService } from "../../services/quiz-service";

@Component({
    selector: "app-quiz",
    templateUrl: "./quiz.component.html",
    styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
    quizQuestions: QuizQuestion[] = [];
    currentQuestionIndex: number = 0;
    userAnswerIndex: number | null = null;
    isCorrect: boolean | null = null;
    moneyCount: number = 0;

    showHint: boolean = false;

    constructor(private quizService: QuizService) {}

    ngOnInit(): void {
        this.quizService.getQuizQuestions().subscribe(
            (quizData: QuizQuestion[]) => {
                this.quizQuestions = quizData;
            },
            (error) => {
                console.error("Error loading quiz-component questions:", error);
            }
        );
    }

    submitAnswer(): void {
        if (this.userAnswerIndex !== null && this.isCorrect === null) {
            this.isCorrect = this.quizQuestions[
                this.currentQuestionIndex
            ].isCorrect(this.userAnswerIndex);

            if (this.isCorrect) {
                // Increase money count on correct answer
                this.moneyCount +=
                    this.quizQuestions[
                        this.currentQuestionIndex
                    ].getMoneyAmount();
            }
        }
    }

    loadNextQuestion(forced: boolean): void {
        if (
            this.currentQuestionIndex >= 0 &&
            this.currentQuestionIndex < this.quizQuestions.length &&
            (this.isCorrect !== null || forced)
        ) {
            this.currentQuestionIndex++;
            this.showHint = false;
            this.userAnswerIndex = null;
            this.isCorrect = null;
        }
    }

    getCurrentMoney(): string {
        return `$${this.moneyCount}`;
    }

    toggleHint(): void {
        this.showHint = !this.showHint;
    }

    restartQuiz(): void {
        if (
            !(
                this.quizQuestions.length > 0 &&
                this.currentQuestionIndex < this.quizQuestions.length
            )
        ) {
            this.currentQuestionIndex = 0;
            this.userAnswerIndex = null;
            this.isCorrect = null;
            this.moneyCount = 0;
        }
    }

    loopThroughOptions(): void {
        if (this.userAnswerIndex === null) {
            this.userAnswerIndex = 0;
            return;
        } else {
            const opionsCount =
                this.quizQuestions[this.currentQuestionIndex].getOptionsCount();

            if (this.userAnswerIndex < opionsCount - 1) {
                this.userAnswerIndex++;
            } else {
                this.userAnswerIndex = 0;
            }
        }
    }

    forceExitQuiz(): void {
        this.currentQuestionIndex = this.quizQuestions.length;
    }
}
