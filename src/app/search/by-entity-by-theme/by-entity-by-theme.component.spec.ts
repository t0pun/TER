import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEntityByThemeComponent } from './by-entity-by-theme.component';

describe('ByEntityByThemeComponent', () => {
  let component: ByEntityByThemeComponent;
  let fixture: ComponentFixture<ByEntityByThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByEntityByThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByEntityByThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
