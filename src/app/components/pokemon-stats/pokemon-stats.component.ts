import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.css'],
})
export class PokemonStatsComponent implements OnInit {
  @Input() pokemon: any;
  stats: any[] = [];
  displayedColumns: string[] = ['base_stat', 'effort', 'name'];

  getAbilities() {
    return this.pokemon.abilities
      .map((ability: any) => ability.ability.name)
      .join(',');
  }

  ngOnInit(): void {
    this.stats = this.pokemon.stats.map((stat: any) => ({
      base_stat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name,
    }));
  }
}
