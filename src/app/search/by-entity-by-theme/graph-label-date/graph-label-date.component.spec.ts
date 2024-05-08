import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphLabelDateComponent } from './graph-label-date.component';

describe('GraphLabelDateComponent', () => {
  let component: GraphLabelDateComponent;
  let fixture: ComponentFixture<GraphLabelDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphLabelDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphLabelDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
