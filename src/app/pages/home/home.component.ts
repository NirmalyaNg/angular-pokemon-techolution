import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  totalCount!: number;
  loading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  handlePageEvent(event: PageEvent) {
    this.fetchPokemons(event.pageIndex * 12);
  }

  private fetchPokemons(offset: number = 0) {
    this.loading = true;
    this.pokemonService.fetchPokemons(offset).subscribe({
      next: (data) => {
        console.log(data);
        this.loading = false;
        this.totalCount = data.count;
        this.pokemons = data.results;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }
}
