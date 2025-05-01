
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Member } from '@/types/types';
import { useMembers } from '@/context/MemberContext';
import { useNavigate } from 'react-router-dom';

interface MemberFormProps {
  initialData?: Member;
  mode: 'add' | 'edit';
}

const memberFormSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  postNom: z.string().min(2, { message: 'Le post-nom doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  genre: z.enum(['Homme', 'Femme'], {
    required_error: 'Veuillez sélectionner un genre',
  }),
  adresse: z.string().min(5, { message: 'L\'adresse doit contenir au moins 5 caractères' }),
  paroisse: z.string().min(2, { message: 'La paroisse doit contenir au moins 2 caractères' }),
  fonction: z.string().min(2, { message: 'La fonction doit contenir au moins 2 caractères' }),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

const MemberForm: React.FC<MemberFormProps> = ({ initialData, mode }) => {
  const { addMember, updateMember } = useMembers();
  const navigate = useNavigate();

  const defaultValues: MemberFormValues = {
    nom: initialData?.nom || '',
    postNom: initialData?.postNom || '',
    prenom: initialData?.prenom || '',
    genre: initialData?.genre || 'Homme',
    adresse: initialData?.adresse || '',
    paroisse: initialData?.paroisse || '',
    fonction: initialData?.fonction || '',
  };

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues,
  });

  const onSubmit = (values: MemberFormValues) => {
    if (mode === 'add') {
      addMember(values);
    } else if (mode === 'edit' && initialData) {
      updateMember(initialData.id, values);
    }
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="postNom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post-Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Post-Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Homme">Homme</SelectItem>
                    <SelectItem value="Femme">Femme</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="paroisse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paroisse</FormLabel>
                <FormControl>
                  <Input placeholder="Paroisse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fonction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fonction</FormLabel>
                <FormControl>
                  <Input placeholder="Fonction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Annuler
          </Button>
          <Button type="submit">
            {mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MemberForm;
