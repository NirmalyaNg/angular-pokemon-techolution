import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, exhaustMap, from } from 'rxjs';
import { PokemonDataResponse } from '../models/pokemon-response.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  fetchPokemons(offset: number = 0): Observable<PokemonDataResponse> {
    return this.http.get<PokemonDataResponse>(this.baseUrl, {
      params: new HttpParams().appendAll({
        limit: 12,
        offset,
      }),
    });
  }

  fetchPokemonData(url: string) {
    return this.http.get(url);
  }

  fetchPokemonDataById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  fetchEvolutionChain(url: string) {
    return this.http
      .get(url)
      .pipe(
        exhaustMap((response: any) =>
          this.http.get(response.evolution_chain.url)
        )
      );
  }

  fetchEvolutionStageDetails(stages: any[]) {
    return from(stages).pipe(
      concatMap((stage) => {
        return this.http.get(this.baseUrl + `/${stage.name}`);
      })
    );
  }
}
