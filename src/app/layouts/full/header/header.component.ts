import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from 'src/app/services/dir.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/pages/authentication/side-login/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent {
  selectedLang:string ='en'

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private translate : TranslateService,
      private LanguageService:LanguageService, 
      private authService: AuthService,
      private router: Router
    ) {
   this.translate.setDefaultLang('en')
   this.LanguageService.currentLanguage.subscribe(lang=>{
     this.selectedLang = lang
     this.translate.use(lang)
     const isRtl = lang === 'ar';
    this.LanguageService.setLanguageDirection(isRtl)
   })
    }

  switchlanguage(lang : string){

    this.LanguageService.changeLanguage(lang)
   console.log('Current language:', lang);

  }


  // logout(){
  //   let confirmMsg = confirm('are you sure ? ')
  //   if(confirmMsg){
  //     this.authService.logout()
  //     this.router.navigate(['/authentication/login']);
  //   }
  // }


  logout(){
    // let confirmMsg = confirm('are you sure ? ')
    // if(confirmMsg){
    //   this.authService.logout()
    //   this.router.navigate(['/authentication/login']);
    // }

    Swal.fire({
      title: "Are You Sure?",
      customClass: {
        title: 'custom-title',
      },
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor : "#e45555"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        this.router.navigate(['/authentication/login']);
      }
    }).catch((err)=>{
      Swal.fire({
        title: 'Error!',
        text: 'Error Logout',
        icon: 'error',
        iconColor: '#000000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#000000',
      });
    });

  }

}
