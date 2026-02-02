// components/dashboard/courses/module-materials-list.tsx
"use client";

import { FileText, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteModuleMaterial } from "@/actions/courses";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MaterialUploadForm } from "./material-upload-form";

interface Material {
  id: string;
  title: string;
  url: string;
  type: string;
}

export function ModuleMaterialsList({ 
  moduleId, 
  materials 
}: { 
  moduleId: string; 
  materials: Material[] 
}) {
  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Tem certeza que deseja remover este material?")) return;
    
    const result = await deleteModuleMaterial(id, url);
    if (result.error) toast.error(result.error);
    else toast.success(result.success);
  };

  return (
    <div className="mt-4 space-y-3 bg-[#062214]/50 p-3 rounded-lg border border-[#2A5432]">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold uppercase text-gray-400">Materiais do Módulo</h4>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-7 text-[#76A771] hover:text-white">
              <Plus className="w-3 h-3 mr-1" /> Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0A311D] border-[#2A5432]">
            <MaterialUploadForm moduleId={moduleId} />
          </DialogContent>
        </Dialog>
      </div>

      {materials.length === 0 ? (
        <p className="text-xs text-gray-500 italic">Nenhum material anexado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {materials.map((material) => (
            <div 
              key={material.id} 
              className="flex items-center justify-between p-2 bg-[#062214] border border-[#2A5432]/50 rounded text-sm text-white"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-[#76A771] flex-shrink-0" />
                <span className="truncate">{material.title}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                onClick={() => handleDelete(material.id, material.url)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}