
import React from 'react';
import MemberForm from '@/components/MemberForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddMember: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un nouveau membre</CardTitle>
        </CardHeader>
        <CardContent>
          <MemberForm mode="add" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMember;
