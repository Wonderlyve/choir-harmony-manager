
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Church, Trash, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMembers } from '@/context/MemberContext';
import { Member } from '@/types/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const navigate = useNavigate();
  const { deleteMember } = useMembers();
  
  const handleEdit = () => {
    navigate(`/edit/${member.id}`);
  };
  
  const handleDelete = () => {
    deleteMember(member.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className={cn(
        "flex flex-row items-center gap-4 pb-2",
        member.genre === 'Homme' ? "bg-blue-50" : "bg-pink-50"
      )}>
        <div className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center",
          member.genre === 'Homme' ? "bg-blue-200 text-blue-700" : "bg-pink-200 text-pink-700"
        )}>
          <User size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{member.nom} {member.postNom}</h3>
          <p className="text-sm text-muted-foreground">
            {member.prenom}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{member.adresse}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Church size={16} />
          <span>{member.paroisse}</span>
        </div>
        <div className="px-3 py-1 mt-2 text-sm rounded-full bg-secondary w-fit">
          {member.fonction}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2 pb-4">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <PenLine size={16} className="mr-1" />
          Modifier
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash size={16} className="mr-1" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous certain(e) ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera définitivement {member.nom} {member.postNom} de la liste des membres. 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Confirmer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
