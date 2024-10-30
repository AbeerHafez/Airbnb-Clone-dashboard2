import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from 'src/app/services/dir.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule, FormsModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent {
  selectedLang:string ='en'

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private translate : TranslateService, private LanguageService:LanguageService ) {
   this.translate.setDefaultLang('en')
   this.translate.use(this.selectedLang)
   this.LanguageService.setLanguageDirection(false)
    }

  switchlanguage(lang : string){

    this.translate.use(lang);
    this.selectedLang = lang

    const isRtl = lang === 'ar';
    this.LanguageService.setLanguageDirection(isRtl)
        console.log('Current language:', lang);

  }

}
