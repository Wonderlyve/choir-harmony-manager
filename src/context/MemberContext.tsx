
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Member, Gender, Parish, DashboardStats } from '../types/types';

interface MemberContextProps {
  members: Member[];
  addMember: (member: Omit<Member, 'id' | 'createdAt'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  getMember: (id: string) => Member | undefined;
  getParishes: () => Parish[];
  getDashboardStats: () => DashboardStats;
  getParishMembers: (parish: string) => Member[];
  getChoirMembers: (gender: Gender) => Member[];
}

const MemberContext = createContext<MemberContextProps>({} as MemberContextProps);

// Sample initial data
const initialMembers: Member[] = [
  {
    id: '1',
    nom: 'Dubois',
    postNom: 'Jean',
    prenom: 'Michel',
    genre: 'Homme',
    adresse: '15 Rue de l\'Église',
    paroisse: 'Saint Joseph',
    fonction: 'Ténor',
    createdAt: new Date(2023, 1, 15).toISOString(),
  },
  {
    id: '2',
    nom: 'Martin',
    postNom: 'Marie',
    prenom: 'Claire',
    genre: 'Femme',
    adresse: '8 Avenue du Chant',
    paroisse: 'Notre Dame',
    fonction: 'Soprano',
    createdAt: new Date(2023, 2, 20).toISOString(),
  },
  {
    id: '3',
    nom: 'Leroy',
    postNom: 'Philippe',
    prenom: 'André',
    genre: 'Homme',
    adresse: '24 Boulevard des Arts',
    paroisse: 'Saint Pierre',
    fonction: 'Basse',
    createdAt: new Date(2023, 3, 5).toISOString(),
  },
  {
    id: '4',
    nom: 'Petit',
    postNom: 'Élise',
    prenom: 'Sophie',
    genre: 'Femme',
    adresse: '36 Rue des Lilas',
    paroisse: 'Saint Joseph',
    fonction: 'Alto',
    createdAt: new Date(2023, 4, 12).toISOString(),
  },
  {
    id: '5',
    nom: 'Moreau',
    postNom: 'Laurent',
    prenom: 'Thomas',
    genre: 'Homme',
    adresse: '9 Rue du Conservatoire',
    paroisse: 'Notre Dame',
    fonction: 'Baryton',
    createdAt: new Date(2023, 5, 18).toISOString(),
  },
  {
    id: '6',
    nom: 'Lambert',
    postNom: 'Céline',
    prenom: 'Émilie',
    genre: 'Femme',
    adresse: '42 Avenue Mozart',
    paroisse: 'Saint Pierre',
    fonction: 'Soprano',
    createdAt: new Date(2023, 6, 25).toISOString(),
  }
];

export const MemberProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const addMember = (member: Omit<Member, 'id' | 'createdAt'>) => {
    const newMember: Member = {
      ...member,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setMembers([...members, newMember]);
    toast.success('Membre ajouté avec succès');
  };

  const updateMember = (id: string, member: Partial<Member>) => {
    setMembers(members.map(m => m.id === id ? { ...m, ...member } : m));
    toast.success('Membre mis à jour avec succès');
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    toast.success('Membre supprimé avec succès');
  };

  const getMember = (id: string) => {
    return members.find(m => m.id === id);
  };

  const getParishes = (): Parish[] => {
    const parishMap = new Map<string, number>();
    
    members.forEach(member => {
      const count = parishMap.get(member.paroisse) || 0;
      parishMap.set(member.paroisse, count + 1);
    });
    
    return Array.from(parishMap.entries()).map(([name, memberCount]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      memberCount
    }));
  };

  const getDashboardStats = (): DashboardStats => {
    const maleMembers = members.filter(m => m.genre === 'Homme').length;
    const femaleMembers = members.filter(m => m.genre === 'Femme').length;
    const totalParishes = new Set(members.map(m => m.paroisse)).size;
    
    return {
      totalMembers: members.length,
      maleMembers,
      femaleMembers,
      totalParishes
    };
  };

  const getParishMembers = (parish: string): Member[] => {
    return members.filter(m => m.paroisse === parish);
  };

  const getChoirMembers = (gender: Gender): Member[] => {
    return members.filter(m => m.genre === gender);
  };

  return (
    <MemberContext.Provider value={{
      members,
      addMember,
      updateMember,
      deleteMember,
      getMember,
      getParishes,
      getDashboardStats,
      getParishMembers,
      getChoirMembers
    }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMembers = () => useContext(MemberContext);

export default MemberContext;
