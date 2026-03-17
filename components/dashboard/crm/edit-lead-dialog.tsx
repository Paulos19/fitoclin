"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateLeadInfo } from "@/actions/crm";
import { useState } from "react";
import { toast } from "sonner";
import { Edit, Loader2 } from "lucide-react";

interface EditLeadDialogProps {
    lead: {
        id: string;
        name: string;
        phone: string;
        email: string | null;
        source: string;
        notes: string | null;
    };
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export function EditLeadDialog({ lead, trigger, onSuccess }: EditLeadDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const res = await updateLeadInfo(lead.id, formData);
            if (res.success) {
                toast.success(res.message);
                setOpen(false);
                if (onSuccess) onSuccess();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Erro ao atualizar o lead");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2A5432] h-9 px-2">
                        <Edit className="w-4 h-4 mr-2 text-blue-400" /> Editar Lead
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#0A311D] border border-[#2A5432] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">Editar Lead</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Nome</Label>
                        <Input
                            name="name"
                            required
                            defaultValue={lead.name}
                            className="bg-[#062214] border-[#2A5432] focus-visible:ring-[#76A771] text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">WhatsApp</Label>
                        <Input
                            name="phone"
                            required
                            defaultValue={lead.phone}
                            placeholder="(00) 00000-0000"
                            className="bg-[#062214] border-[#2A5432] focus-visible:ring-[#76A771] text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Email (Opcional)</Label>
                        <Input
                            name="email"
                            type="email"
                            defaultValue={lead.email || ""}
                            placeholder="email@exemplo.com"
                            className="bg-[#062214] border-[#2A5432] focus-visible:ring-[#76A771] text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Origem</Label>
                        <Select name="source" defaultValue={lead.source || "Instagram"}>
                            <SelectTrigger className="bg-[#062214] border-[#2A5432] text-white focus:ring-[#76A771]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white">
                                <SelectItem value="Instagram" className="focus:bg-[#2A5432] focus:text-white">Instagram</SelectItem>
                                <SelectItem value="Indicação" className="focus:bg-[#2A5432] focus:text-white">Indicação</SelectItem>
                                <SelectItem value="Google" className="focus:bg-[#2A5432] focus:text-white">Google / Site</SelectItem>
                                <SelectItem value="WhatsApp" className="focus:bg-[#2A5432] focus:text-white">WhatsApp Automatizado</SelectItem>
                                <SelectItem value="Importado" className="focus:bg-[#2A5432] focus:text-white">Planilha Importada</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Observações</Label>
                        <Input
                            name="notes"
                            defaultValue={lead.notes || ""}
                            placeholder="Ex: Quer horário de almoço"
                            className="bg-[#062214] border-[#2A5432] focus-visible:ring-[#76A771] text-white"
                        />
                    </div>
                    <DialogFooter className="pt-4 mt-2 border-t border-[#2A5432]/50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-transparent border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]/30"
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#76A771] hover:bg-[#5C8558] text-[#062214] font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                "Salvar Alterações"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
