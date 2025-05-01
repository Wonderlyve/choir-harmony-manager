
import React from 'react';
import { useMembers } from '@/context/MemberContext';
import MemberList from '@/components/MemberList';

const AllMembers: React.FC = () => {
  const { members } = useMembers();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Tous les membres</h1>
        <p className="text-muted-foreground">
          Liste complète de tous les membres des chorales
        </p>
      </div>
      
      <MemberList members={members} />
    </div>
  );
};

export default AllMembers;
