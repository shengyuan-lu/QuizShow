import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QuizQuestion } from "../data/quiz-question";

@Injectable({
    providedIn: "root"
})
export class QuizService {
    private sampleQuizQuestions: QuizQuestion[] = [
        new QuizQuestion(
            "Who wrote 'Romeo and Juliet'?",
            [
                "Charles Dickens",
                "William Shakespeare",
                "Jane Austen",
                "Mark Twain"
            ],
            1,
            "William Shakespeare wrote 'Romeo and Juliet'.",
            "This play is one of his most famous tragedies.",
            100
        ),

        new QuizQuestion(
            "What is the largest mammal in the world?",
            ["Elephant", "Giraffe", "Hippopotamus", "Blue Whale"],
            3,
            "The Blue Whale is the largest mammal in the world.",
            "These majestic creatures are found in oceans.",
            200
        ),

        new QuizQuestion(
            "In which year did the Titanic sink?",
            ["1912", "1905", "1920", "1931"],
            0,
            "The Titanic sank in 1912.",
            "It was a tragic maritime disaster.",
            300
        ),

        new QuizQuestion(
            "Which famous scientist developed the theory of general relativity?",
            [
                "Isaac Newton",
                "Albert Einstein",
                "Galileo Galilei",
                "Stephen Hawking"
            ],
            1,
            "Albert Einstein developed the theory of general relativity.",
            "His formula is E=mc^2.",
            400
        )
    ];

    getQuizQuestions(): Observable<QuizQuestion[]> {
        // You can fetch questions from an API or any other source if needed
        return of(this.sampleQuizQuestions);
    }
}
