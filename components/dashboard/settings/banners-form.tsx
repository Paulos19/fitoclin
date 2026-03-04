"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { updateBanners, uploadBannerImage } from "@/actions/settings";

interface BannersFormProps {
    initialHomeBanners: string[];
    initialCommunityBanner: string | null;
}

export function BannersForm({ initialHomeBanners, initialCommunityBanner }: BannersFormProps) {
    const [homeBanners, setHomeBanners] = useState<string[]>(initialHomeBanners || []);
    const [communityBanner, setCommunityBanner] = useState<string | null>(initialCommunityBanner);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'home' | 'community') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadBannerImage(formData);

        if (res.error) {
            toast.error(res.error);
        } else if (res.success && res.url) {
            if (type === 'home') {
                setHomeBanners(prev => [...prev, res.url!]);
            } else {
                setCommunityBanner(res.url);
            }
            toast.success("Imagem enviada com sucesso!");
        }
        setUploading(false);
    };

    const removeHomeBanner = (index: number) => {
        setHomeBanners(prev => prev.filter((_, i) => i !== index));
    };

    const removeCommunityBanner = () => {
        setCommunityBanner(null);
    };

    const handleSave = async () => {
        setLoading(true);
        const res = await updateBanners({ homeBanners, communityBanner });
        setLoading(false);

        if (res.error) toast.error(res.error);
        else toast.success(res.success);
    };

    return (
        <Card className="bg-[#0A311D]/40 border-[#2A5432]/30 mt-6">
            <CardHeader>
                <CardTitle className="text-white">Banners da Plataforma</CardTitle>
                <CardDescription>Gerencie as imagens do slider principal (Home) e o banner da Comunidade.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">

                {/* Home Banners */}
                <div className="space-y-4">
                    <Label className="text-gray-300 text-lg">Banners da Home Page (Slider)</Label>
                    <p className="text-sm text-gray-500">Faça o upload de uma ou mais imagens. Elas aparecerão no slider inicial do site.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {homeBanners.map((url, i) => (
                            <div key={i} className="relative aspect-video bg-[#062214] border border-[#2A5432] rounded-lg overflow-hidden group">
                                <Image src={url} alt={`Banner ${i + 1}`} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeHomeBanner(i)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Label className="aspect-video bg-[#062214] border-2 border-dashed border-[#2A5432] hover:border-[#76A771] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors text-gray-500 hover:text-[#76A771]">
                            <ImagePlus className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Adicionar Imagem</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, 'home')}
                                disabled={uploading}
                            />
                        </Label>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px w-full bg-[#2A5432]/30" />

                {/* Community Banner */}
                <div className="space-y-4">
                    <Label className="text-gray-300 text-lg">Banner Fixo da Comunidade</Label>
                    <p className="text-sm text-gray-500">Imagem de destaque na área da comunidade (ex: "Sua cadeira está reservada").</p>

                    <div className="max-w-md">
                        {communityBanner ? (
                            <div className="relative aspect-[4/3] bg-[#062214] border border-[#2A5432] rounded-lg overflow-hidden group">
                                <Image src={communityBanner} alt="Banner Comunidade" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button type="button" variant="destructive" size="sm" onClick={removeCommunityBanner}>
                                        Remover Banner
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Label className="aspect-[4/3] bg-[#062214] border-2 border-dashed border-[#2A5432] hover:border-[#76A771] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors text-gray-500 hover:text-[#76A771]">
                                <ImagePlus className="w-8 h-8 mb-2" />
                                <span className="text-sm font-medium">Fazer Upload</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, 'community')}
                                    disabled={uploading}
                                />
                            </Label>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="button" onClick={handleSave} disabled={loading || uploading} className="btn-gradient w-full md:w-auto">
                        {loading || uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Salvar Banners
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
