import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { HandtrackerComponent } from "./components/handtracker/handtracker.component";
import { QuizComponent } from "./components/quiz-component/quiz.component";

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HandtrackerComponent,
        QuizComponent
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
