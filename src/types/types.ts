
export type Gender = 'Homme' | 'Femme';

export interface Member {
  id: string;
  nom: string;
  postNom: string;
  prenom: string;
  genre: Gender;
  adresse: string;
  paroisse: string;
  fonction: string;
  createdAt: string;
}

export interface Parish {
  id: string;
  name: string;
  memberCount: number;
}

export interface DashboardStats {
  totalMembers: number;
  maleMembers: number;
  femaleMembers: number;
  totalParishes: number;
}
