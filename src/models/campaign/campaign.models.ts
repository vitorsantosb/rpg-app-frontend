export interface Campaign {
  id: string;
  name: string;
  description?: string;
  masterId: string;
  players: number;
  maxPlayers: number;
  status: 'active' | 'paused' | 'finished';
}
