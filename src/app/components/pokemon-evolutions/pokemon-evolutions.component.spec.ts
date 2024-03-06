import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionsComponent } from './pokemon-evolutions.component';

describe('PokemonEvolutionsComponent', () => {
  let component: PokemonEvolutionsComponent;
  let fixture: ComponentFixture<PokemonEvolutionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonEvolutionsComponent]
    });
    fixture = TestBed.createComponent(PokemonEvolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
