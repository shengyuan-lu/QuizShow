export class QuizQuestion {
    private questionText: string;
    private options: string[];
    private correctOptionIndex: number;
    private correctReason: string;
    private hint: string;
    private moneyAmount: number;

    constructor(
        questionText: string,
        options: string[],
        correctOptionIndex: number,
        correctReason: string,
        hint: string,
        moneyAmount: number
    ) {
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.correctReason = correctReason;
        this.hint = hint;
        this.moneyAmount = moneyAmount;
    }

    getQuestionText(): string {
        return this.questionText;
    }

    getOptions(): string[] {
        return this.options;
    }

    getOptionsCount(): number {
        return this.options.length;
    }

    getCorrectOptionIndex(): number {
        return this.correctOptionIndex;
    }

    getHint(): string {
        return this.hint;
    }

    getMoneyAmount(): number {
        return this.moneyAmount;
    }

    getCorrectReason(): string {
        return this.correctReason;
    }

    isCorrect(answerIndex: number): boolean {
        return answerIndex === this.correctOptionIndex;
    }
}
