import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MainPageContentComponent } from './main-page-content.component';

describe('MainPageContentComponent', () => {
  let component: MainPageContentComponent;
  let fixture: ComponentFixture<MainPageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageContentComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
