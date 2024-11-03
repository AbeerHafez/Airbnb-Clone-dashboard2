import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTranslateModule } from 'src/app.translate';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';

  constructor(private translate: TranslateService){
  }
  
  initializeTranslation(){
    this.translate.addLangs(['en' , 'ar'])
    this.translate.setDefaultLang('en')
    
    const browserlang= this.translate.getBrowserLang()
    this.translate.use(browserlang?.match(/en|ar/)?browserlang:'en')

    

    // this.translate.onLangChange.subscribe(event => {
    //   document.documentElement.dir = event.lang === 'ar' ? 'rtl' : 'ltr';
    //   document.body.dir = event.lang === 'ar' ? 'rtl' : 'ltr';
    // });

  }
}
