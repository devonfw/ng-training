import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../book';
import {cloneDeep} from 'lodash';
import {BookService} from '../book.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  @ViewChild('bookForm')
  currentForm: NgForm;

  submitted: boolean;

  private static createErrorMessage(errorObject: {[key: string]: any}): string {
    if (errorObject) {
      for (const errorCode in errorObject) {
        if (errorObject.hasOwnProperty(errorCode)) {
          switch (errorCode) {
            case 'required':
              return 'Please provide a value';
            case 'maxlength':
              return 'The value is too long';
            default:
              return 'The value is wrong';
          }
        }
      }
    }
  };

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
    this.book = new Book();
    this.submitted = false;
  }

  getErrorMessageOfField(fieldName: string): string {
    if (this.isFieldInvalid(fieldName)) {
      const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
      return BookDetailsComponent.createErrorMessage(fieldControl.errors);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
    return fieldControl && fieldControl.invalid && (fieldControl.touched || this.submitted);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {book: Book}) => {
      if (data.book) {
        this.book = data.book;
      }
    });
  }

  apply(): void {
    this.submitted = true;
    if (this.currentForm.form.valid) {
      this.bookService.save(this.book).subscribe(() => {
        this.router.navigate(['/book-app/books']);
      });
    }
  }
}