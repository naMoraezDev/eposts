export type Matches = Match[];

export interface Match {
  id: number;
  slug: string;
  videogame: Videogame;
  league: League;
  tournament: Tournament;
  status: string;
  name: string;
  begin_at: string;
  streams_list: StreamsList[];
  results: Result[];
  opponents: Opponent[];
}

export interface Videogame {
  id: number;
  name: string;
  slug: string;
}

export interface League {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
}

export interface Tournament {
  begin_at: string;
  detailed_stats?: boolean;
  end_at: string;
  has_bracket?: boolean;
  id: number;
  league_id: number;
  live_supported: any;
  modified_at: string;
  name: string;
  prizepool?: string;
  serie_id: number;
  slug: string;
  tier: string;
  winner_id: any;
  winner_type: string;
}

export interface StreamsList {
  main: boolean;
  raw_url: string;
  language: string;
  official: boolean;
  embed_url?: string;
}

export interface Result {
  score: number;
  team_id: number;
}

export interface Opponent {
  opponent: Opponent2;
}

export interface Opponent2 {
  id: number;
  slug: string;
  name: string;
  acronym: string;
  location: string;
  image_url: string;
}
