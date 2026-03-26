"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Square, Loader2, MonitorSpeaker } from "lucide-react";
import { toast } from "sonner";
import { createTranscriptionRecord } from "@/actions/transcription";

export function ConsultationRecorder({ patientId }: { patientId: string }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [duration, setDuration] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamsRef = useRef<MediaStream[]>([]);

    const startRecording = async () => {
        try {
            toast.info("Selecione a guia da videochamada para capturar o áudio do paciente.");

            // 1. Captura o sistema (Guia do Meet/Zoom)
            const systemStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            // 2. Captura o Microfone da Dra. Isa
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            streamsRef.current = [systemStream, micStream];

            // 3. Mistura os dois áudios (Mixer)
            const audioContext = new AudioContext();
            const destination = audioContext.createMediaStreamDestination();

            audioContext.createMediaStreamSource(micStream).connect(destination);

            if (systemStream.getAudioTracks().length > 0) {
                audioContext.createMediaStreamSource(systemStream).connect(destination);
            } else {
                toast.warning("Nenhum áudio do sistema detectado. Apenas seu microfone será gravado.");
            }

            const mixedStream = destination.stream;
            const mediaRecorder = new MediaRecorder(mixedStream, { mimeType: 'audio/webm' });

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
                await handleUpload(audioBlob);

                // Desliga as câmeras e microfones após finalizar
                streamsRef.current.forEach(stream => stream.getTracks().forEach(track => track.stop()));
                audioContext.close();
            };

            mediaRecorder.start();
            setIsRecording(true);

            timerRef.current = setInterval(() => setDuration((prev) => prev + 1), 1000);
            toast.success("Gravação iniciada!");

        } catch (error) {
            console.error("Erro ao iniciar gravação", error);
            toast.error("Permissão negada ou cancelada.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            setDuration(0);
        }
    };

    const handleUpload = async (audioBlob: Blob) => {
        setIsUploading(true);
        toast.info("Fazendo upload e acionando a IA...");

        try {
            const file = new File([audioBlob], `consulta-${patientId}-${Date.now()}.webm`, { type: "audio/webm" });

            // Upload via server action (UploadThing UTApi)
            const formData = new FormData();
            formData.append("file", file);

            const { uploadAudioFile } = await import("@/actions/transcription");
            const uploadResult = await uploadAudioFile(formData);

            if (uploadResult.error) {
                toast.error(uploadResult.error);
                setIsUploading(false);
                return;
            }

            const res = await createTranscriptionRecord(patientId, uploadResult.url!);

            if (res.success) {
                toast.success("Áudio enviado! Acompanhe na aba Transcrição.");
            } else {
                toast.error("Erro ao registrar no banco.");
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            toast.error("Erro ao enviar o áudio.");
        } finally {
            setIsUploading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="flex items-center gap-3 bg-[#062214]/80 px-4 py-2 rounded-full border border-[#2A5432]/50 shadow-inner">
            {isRecording ? (
                <>
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm animate-pulse w-16">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        {formatTime(duration)}
                    </div>
                    <Button onClick={stopRecording} size="sm" variant="destructive" className="h-8 rounded-full px-4 font-semibold text-xs">
                        <Square className="w-3 h-3 mr-1 fill-current" /> Finalizar
                    </Button>
                </>
            ) : isUploading ? (
                <div className="flex items-center gap-2 text-[#76A771] text-xs font-semibold px-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processando IA...
                </div>
            ) : (
                <Button onClick={startRecording} size="sm" className="h-8 bg-[#76A771] hover:bg-[#5b8557] text-[#062214] rounded-full px-4 font-semibold text-xs">
                    <MonitorSpeaker className="w-4 h-4 mr-2" /> Gravar Consulta
                </Button>
            )}
        </div>
    );
}