"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LockOpen, Loader2 } from "lucide-react";
import { grantAccess } from "@/actions/admin";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
}

export function GrantAccessDialog({ courses }: { courses: Course[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await grantAccess(formData);
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
        <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214]">
          <LockOpen className="w-4 h-4 mr-2" /> Liberar Acesso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#062214] border-[#2A5432] text-white">
        <DialogHeader>
          <DialogTitle>Liberar Acesso Manual</DialogTitle>
          <DialogDescription className="text-gray-400">
            Dê acesso a um curso ou à comunidade para um aluno que comprou externamente.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-300">Email do Aluno</Label>
            <Input id="email" name="email" type="email" required className="bg-[#0A311D] border-[#2A5432] text-white" placeholder="aluno@email.com" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="accessType" className="text-gray-300">O que liberar?</Label>
            <Select name="accessType" required>
              <SelectTrigger className="bg-[#0A311D] border-[#2A5432] text-white">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white">
                <SelectItem value="COMMUNITY">✨ Comunidade VIP</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Liberar Agora
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}