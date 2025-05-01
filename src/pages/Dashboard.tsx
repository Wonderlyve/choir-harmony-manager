
import React from 'react';
import { useMembers } from '@/context/MemberContext';
import StatCard from '@/components/StatCard';
import { Users, UserCheck, Church, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { getDashboardStats, getParishes, members } = useMembers();
  const navigate = useNavigate();
  
  const stats = getDashboardStats();
  const parishes = getParishes();
  const sortedParishes = [...parishes].sort((a, b) => b.memberCount - a.memberCount);
  
  // Calculate percentage for gender distribution
  const malePercentage = stats.totalMembers > 0 
    ? Math.round((stats.maleMembers / stats.totalMembers) * 100) 
    : 0;
  const femalePercentage = stats.totalMembers > 0 
    ? Math.round((stats.femaleMembers / stats.totalMembers) * 100) 
    : 0;

  // Calculate recent growth (mock data for demo)
  const recentMaleTrend = { value: 5, isPositive: true };
  const recentFemaleTrend = { value: 8, isPositive: true };
  const recentParishTrend = { value: 2, isPositive: true };

  // Recent members (most recent 3)
  const recentMembers = [...members]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue dans votre gestionnaire de chorales</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Nombre total de choristes" 
          value={stats.totalMembers} 
          icon={<Users className="h-full w-full" />} 
          description="Tous les membres actifs"
        />
        
        <StatCard 
          title="Chorale des hommes" 
          value={stats.maleMembers} 
          icon={<UserCheck className="h-full w-full" />} 
          description="Choristes masculins" 
          trend={recentMaleTrend}
        />
        
        <StatCard 
          title="Chorale des femmes" 
          value={stats.femaleMembers} 
          icon={<UserCheck className="h-full w-full" />} 
          description="Choristes féminines"
          trend={recentFemaleTrend}
        />
        
        <StatCard 
          title="Nombre de paroisses" 
          value={stats.totalParishes} 
          icon={<Church className="h-full w-full" />} 
          description="Paroisses représentées"
          trend={recentParishTrend}
          className="md:col-span-3 lg:col-span-1"
        />
        
        <Card className="md:col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Répartition par genre</CardTitle>
            <CardDescription>Distribution des choristes par genre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Hommes</span>
                  </div>
                  <span className="font-medium">{malePercentage}%</span>
                </div>
                <Progress value={malePercentage} className="h-2 bg-muted" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                    <span>Femmes</span>
                  </div>
                  <span className="font-medium">{femalePercentage}%</span>
                </div>
                <Progress value={femalePercentage} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Paroisses principales</CardTitle>
              <CardDescription>Paroisses avec le plus de choristes</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/membres')}>
              Voir tout
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedParishes.slice(0, 5).map((parish, index) => (
                <div key={parish.id} className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{parish.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {parish.memberCount} {parish.memberCount > 1 ? 'membres' : 'membre'}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/paroisse/${parish.name}`)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Membres récents</CardTitle>
              <CardDescription>Derniers choristes enregistrés</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/membres')}>
              Voir tout
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center">
                  <div className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full ${
                    member.genre === 'Homme' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                  }`}>
                    {member.prenom.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{member.nom} {member.postNom}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.paroisse} | {member.fonction}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/edit/${member.id}`)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
