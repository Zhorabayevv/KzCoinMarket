import { Component } from "@angular/core";

@Component({
  selector: 'mc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
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
      options: [
        { title: 'Contact Support', link: '/' },
      ],
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

  constructor() {}
}

