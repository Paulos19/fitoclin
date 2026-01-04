"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon, Save } from "lucide-react";
import { toast } from "sonner";
import { updateMeetLink } from "@/actions/schedule";

interface MeetLinkDialogProps {
  appointmentId: string;
  currentLink?: string | null;
}

export function MeetLinkDialog({ appointmentId, currentLink }: MeetLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await updateMeetLink(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full border-[#2A5432] text-[#76A771] hover:bg-[#2A5432] hover:text-white"
        >
          <LinkIcon className="w-4 h-4 mr-2" /> 
          {currentLink ? "Editar Link" : "Adicionar Link"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link da Videochamada</DialogTitle>
          <DialogDescription className="text-gray-400">
            Cole abaixo o link do Google Meet para esta consulta. O paciente receberá acesso 1h antes.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 py-4">
          <input type="hidden" name="appointmentId" value={appointmentId} />
          
          <div className="space-y-2">
            <Label htmlFor="link">URL da Sala (Google Meet)</Label>
            <Input 
              id="link" 
              name="meetLink" 
              defaultValue={currentLink || ""} 
              placeholder="https://meet.google.com/..."
              className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600"
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="text-gray-400 hover:text-white">
                Cancelar
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold"
            >
              {loading ? "Salvando..." : <><Save className="w-4 h-4 mr-2" /> Salvar Link</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}