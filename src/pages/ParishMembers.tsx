
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMembers } from '@/context/MemberContext';
import MemberList from '@/components/MemberList';

const ParishMembers: React.FC = () => {
  const { parish } = useParams<{ parish: string }>();
  const { getParishMembers } = useMembers();
  
  // Use the parish from params or default to an empty string
  const parishName = parish || '';
  const members = getParishMembers(parishName);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paroisse {parishName}</h1>
        <p className="text-muted-foreground">
          Liste des membres de la paroisse {parishName}
        </p>
      </div>
      
      <MemberList members={members} />
    </div>
  );
};

export default ParishMembers;
