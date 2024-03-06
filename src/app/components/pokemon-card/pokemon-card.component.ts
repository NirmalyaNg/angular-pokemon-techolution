import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() data!: { name: string; url: string };
  image!: string;
  id!: number;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.fetchPokemonData(this.data.url).subscribe({
      next: (result: any) => {
        this.id = result.id;
        this.image = result?.sprites?.other?.dream_world?.front_default;
      },
    });
  }
}
