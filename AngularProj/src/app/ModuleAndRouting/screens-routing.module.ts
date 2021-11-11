import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { Screen1Component } from "../Screens/screen1/screen1.component";
import { Screen2Component } from "../Screens/screen2/screen2.component";
import { Screen3Component } from "../Screens/screen3/screen3.component";
import { Screen4Component } from "../Screens/screen4/screen4.component";
import { Screen5Component } from "../Screens/screen5/screen5.component";
import { PageNotFoundComponent } from "../Screens/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: 'screen1', component: Screen1Component },
    { path: 'screen2', component: Screen2Component },
    { path: 'screen3', component: Screen3Component },
    { path: 'screen4', component: Screen4Component },
    { path: 'screen5', component: Screen5Component },
    { path: '**', component: PageNotFoundComponent }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class UsersRoutingModule { }
