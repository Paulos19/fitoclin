"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteAppointment } from "@/actions/schedule";
import { toast } from "sonner";
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

interface DeleteAppointmentButtonProps {
    appointmentId: string;
}

export function DeleteAppointmentButton({ appointmentId }: DeleteAppointmentButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        setLoading(true);
        const result = await deleteAppointment(appointmentId);
        setLoading(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.success);
            setOpen(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full border-red-900/50 text-red-500 hover:text-white hover:bg-red-900/80">
                    <Trash2 className="w-4 h-4 mr-2" /> Excluir
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Agendamento?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-[#2A5432] text-white hover:bg-[#2A5432] hover:text-white">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                        {loading ? "Excluindo..." : "Excluir"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
