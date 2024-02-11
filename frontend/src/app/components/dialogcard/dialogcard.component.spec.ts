import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcardComponent } from './dialogcard.component';

describe('DialogcardComponent', () => {
  let component: DialogcardComponent;
  let fixture: ComponentFixture<DialogcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
