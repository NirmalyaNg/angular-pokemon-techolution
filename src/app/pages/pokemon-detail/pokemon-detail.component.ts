import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        if (paramMap !== null && paramMap !== undefined) {
          const id = paramMap.get('id');
          if (id !== null) {
            this.pokemonService.fetchPokemonDataById(+id).subscribe({
              next: (data) => {
                this.pokemon = data;
              },
            });
          }
        }
      },
    });
  }
}
