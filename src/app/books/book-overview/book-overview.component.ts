import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {assign} from 'lodash';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  public books: Book[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.books = [];
  }

  selectBook(book: Book): void {
    this.router.navigate(['/book-app/book', book.id]);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {books: Book[]}) => {
      this.books = data.books;
    });
  }

}