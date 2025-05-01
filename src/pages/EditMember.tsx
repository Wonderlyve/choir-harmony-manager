
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MemberForm from '@/components/MemberForm';
import { useMembers } from '@/context/MemberContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditMember: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMember } = useMembers();
  
  const member = id ? getMember(id) : undefined;
  
  if (!member) {
    return <Navigate to="/membres" replace />;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modifier {member.nom} {member.postNom}</CardTitle>
        </CardHeader>
        <CardContent>
          <MemberForm mode="edit" initialData={member} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMember;
