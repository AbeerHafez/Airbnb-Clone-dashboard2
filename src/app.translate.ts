import { HttpClient, HttpClientModule } from "@angular/common/http";
import { importProvidersFrom, NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// import { listingComponent } from "./app/pages/ui-components/listing/listing.component";
// import { FullComponent } from "./app/layouts/full/full.component";



export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')

}

export const provideTranslateService = importProvidersFrom(
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  })
);

export class AppTranslateModule {}
