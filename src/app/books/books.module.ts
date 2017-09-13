import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {FormsModule} from '@angular/forms';
import {BookService} from './book.service';
import {RouterModule} from '@angular/router';
import {BookDetailsResolver} from './book-details/book-details.resolver';
import {BookOverviewResolver} from './book-overview/book-overview.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [BookDetailsComponent, BookOverviewComponent],
  providers: [BookService, BookDetailsResolver, BookOverviewResolver]
})
export class BooksModule {
}