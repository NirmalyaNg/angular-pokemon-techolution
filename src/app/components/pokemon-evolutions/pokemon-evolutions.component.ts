import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-evolutions',
  templateUrl: './pokemon-evolutions.component.html',
  styleUrls: ['./pokemon-evolutions.component.css'],
})
export class PokemonEvolutionsComponent implements OnInit {
  @Input() pokemon: any;
  stages: any[] = [];
  stageDetails: any[] = [];
  loading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loading = true;
    this.pokemonService
      .fetchEvolutionChain(this.pokemon.species.url)
      .subscribe({
        next: (data: any) => {
          this.getStageData(data.chain);
          this.pokemonService
            .fetchEvolutionStageDetails(this.stages)
            .subscribe({
              next: (response) => {
                this.loading = false;
                this.stageDetails.push(response);
              },
              error: (error) => {
                this.loading = false;
                console.log(error);
              },
            });
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
      });
  }

  getStageData(stage: any) {
    this.stages.push({ name: stage.species.name, url: stage.species.url });
    if (!stage.evolves_to || stage.evolves_to.length === 0) {
      return;
    }
    this.getStageData(stage.evolves_to[0]);
  }
}
