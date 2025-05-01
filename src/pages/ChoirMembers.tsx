
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMembers } from '@/context/MemberContext';
import MemberList from '@/components/MemberList';
import { Gender } from '@/types/types';

const ChoirMembers: React.FC = () => {
  const { gender } = useParams<{ gender: string }>();
  const { getChoirMembers } = useMembers();
  
  // Validate and convert the gender parameter
  const validGender: Gender = gender === 'Femme' ? 'Femme' : 'Homme';
  const members = getChoirMembers(validGender);
  
  const title = validGender === 'Homme' ? 'Chorale des Hommes' : 'Chorale des Femmes';
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          Liste des membres de la chorale des {validGender === 'Homme' ? 'hommes' : 'femmes'}
        </p>
      </div>
      
      <MemberList members={members} />
    </div>
  );
};

export default ChoirMembers;
