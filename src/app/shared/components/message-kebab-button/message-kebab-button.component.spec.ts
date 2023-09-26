import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageKebabButtonComponent } from './message-kebab-button.component';

describe('MessageKebabButtonComponent', () => {
  let component: MessageKebabButtonComponent;
  let fixture: ComponentFixture<MessageKebabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageKebabButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageKebabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
