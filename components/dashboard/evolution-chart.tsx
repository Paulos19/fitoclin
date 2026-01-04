"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Activity } from "lucide-react";

type ChartData = {
    date: string;
    Sono: number;
    Energia: number;
    Humor: number;
    Digestão: number;
};

export function EvolutionChart({ data }: { data: ChartData[] }) {
  if (data.length < 2) {
    return (
        <Card className="bg-[#0A311D]/30 border-[#2A5432]/30">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Activity className="w-12 h-12 text-[#76A771] mb-4 opacity-50" />
                <p className="text-gray-300 font-medium">Gráfico de Evolução</p>
                <p className="text-xs text-gray-500 mt-1">Faça pelo menos 2 check-ins semanais para visualizar o seu progresso.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-[#062214] border-[#2A5432]/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-base">
            <Activity className="w-4 h-4 text-[#76A771]" /> Sua Evolução nas últimas semanas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A5432" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                domain={[0, 10]} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A311D', borderColor: '#2A5432', color: '#fff' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend />
              
              <Line type="monotone" dataKey="Sono" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Energia" stroke="#eab308" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Humor" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Digestão" stroke="#76A771" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}