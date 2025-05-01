
import React, { useState } from 'react';
import { Member, Gender } from '@/types/types';
import MemberCard from './MemberCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MemberListProps {
  members: Member[];
  title?: string;
}

const MemberList: React.FC<MemberListProps> = ({ members, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParish, setFilterParish] = useState<string>('');
  const [filterGender, setFilterGender] = useState<Gender | ''>('');
  const navigate = useNavigate();

  const uniqueParishes = Array.from(new Set(members.map(member => member.paroisse)));

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.postNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.prenom.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesParish = filterParish === '' || member.paroisse === filterParish;
    const matchesGender = filterGender === '' || member.genre === filterGender;
    
    return matchesSearch && matchesParish && matchesGender;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <Button onClick={() => navigate('/add')}>
          <UserPlus size={16} className="mr-2" />
          Ajouter un membre
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterParish} onValueChange={setFilterParish}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Paroisse" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Toutes les paroisses</SelectItem>
                {uniqueParishes.map(parish => (
                  <SelectItem key={parish} value={parish}>{parish}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={filterGender} onValueChange={(value: string) => setFilterGender(value as Gender | '')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Tous les genres</SelectItem>
                <SelectItem value="Homme">Homme</SelectItem>
                <SelectItem value="Femme">Femme</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Aucun membre trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
