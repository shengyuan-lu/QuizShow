export class PredictionEvent {
    prediction: string = "None";

    constructor(prediction: string) {
        this.prediction = prediction;
    }

    public getPrediction() {
        return this.prediction;
    }
}
