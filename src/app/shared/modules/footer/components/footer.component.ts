import { Component } from "@angular/core";

@Component({
  selector: 'mc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerOptions = [
    {
      title: 'Products',
      options: [
        { title: 'Blockchain Explorer', link: '/' },
        { title: 'Crypto API', link: '/' },
        { title: 'Crypto Indices', link: '/' },
        { title: 'Jobs Board', link: '/' },
        { title: 'Sitemap', link: '/' },
      ],
    },
    {
      title: 'Company',
      options: [
        { title: 'About us', link: '/' },
        { title: 'Terms of use', link: '/' },
        { title: 'Privacy Policy', link: '/' },
        { title: 'Community Rules', link: '/' },
        { title: 'Disclaimer', link: '/' },
      ],
    },
    {
      title: 'Support',
      options: [
        { title: 'Request Form', link: '/' },
        { title: 'Contact Support', link: '/' },
        { title: 'FAQ', link: '/' },
        { title: 'Glossary', link: '/' },
      ],
    },
    {
      title: 'Socials',
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

