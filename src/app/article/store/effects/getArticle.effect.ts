import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service'
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction
} from '../actions/getArticle.action'
import {IArticle} from 'src/app/shared/types/article.interface'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: any) => {
            return getArticleSuccessAction({article})
          }),

          catchError(() => {
            return of(getArticleFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
