import { forwardRef } from "@angular/core";
import { AppComponent } from "../components/index.component";

export var indexProvider = {
    provide: AppComponent,
    useExisting: forwardRef(function () { return AppComponent; })
};