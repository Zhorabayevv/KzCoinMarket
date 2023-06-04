import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';
import { IGetPostsResponse } from '../types/posts.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  darkMode: boolean;
  currency: string;
  postDto: IGetPostsResponse[];
  fullPost: boolean = false;
  post: IGetPostsResponse;

  constructor(
    private postsService: PostsService,
    private localStorageService: LocalStorageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeValue();
  }

  initializeValue(): void {
    this.postsService.getAllPosts().subscribe((data) => {
      this.postDto = data.postDto;
      console.log(data);
    });
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }

  selectPost(post: IGetPostsResponse): void {
    this.post = post;
    this.fullPost = true;
    console.log(post);
  }
  back(): void {
    this.fullPost = false;
  }
}
