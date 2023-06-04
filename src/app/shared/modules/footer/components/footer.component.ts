import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerOptions = [
    {
      title: 'products',
      options: [
        { title: 'Blockchain Explorer', link: '/' },
        { title: 'Sitemap', link: '/' },
      ],
    },
    {
      title: 'company',
      options: [
        { title: 'About us', link: '/' },
        { title: 'Terms of use', link: '/' },
        { title: 'Privacy Policy', link: '/' },
      ],
    },
    {
      title: 'support',
      options: [{ title: 'Contact Support', link: '/' }],
    },
    {
      title: 'socials',
      options: [
        { title: 'Facebook', link: '/' },
        { title: 'Twitter', link: '/' },
        { title: 'Instagram', link: '/' },
        { title: 'Telegram', link: '/' },
        { title: 'Linkedin', link: '/' },
      ],
    },
  ];
  darkMode: boolean;
  currency: string;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }
}
