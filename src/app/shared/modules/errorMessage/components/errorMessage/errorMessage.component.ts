import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'mc-error-message',
  template: `
      <div class="error-message">
      {{errorMessageProps}}
      </div>
  `
,
})
export class ErrorMessageComponent{
  @Input('message') errorMessageProps: string = "Error Message";
}
