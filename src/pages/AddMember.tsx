
import React from 'react';
import MemberForm from '@/components/MemberForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddMember: React.FC = () => {
  return (
    <div className="container px-0 sm:px-4 mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Ajouter un nouveau membre</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <MemberForm mode="add" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMember;
