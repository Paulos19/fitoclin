import { LeadForm } from "./lead-form";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo: Texto e Infos */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comece a sua jornada de saúde hoje
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                O Método FitoClin une ciência e natureza para tratar a causa raiz dos seus sintomas. Agende uma avaliação e descubra como podemos ajudar você a viver com mais vitalidade.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">WhatsApp / Telefone</h4>
                  <p className="text-gray-600">(11) 99999-9999</p>
                  <p className="text-sm text-gray-500">Seg a Sex das 09h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">E-mail</h4>
                  <p className="text-gray-600">contato@fitoclin.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Localização</h4>
                  <p className="text-gray-600">Av. Paulista, 1000 - Sala 101</p>
                  <p className="text-sm text-gray-500">Jardins, São Paulo - SP</p>
                </div>
              </div>
            </div>
            
            {/* Redes Sociais */}
            <div className="pt-4">
                <a href="#" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
                    <Instagram className="w-5 h-5" /> Siga no Instagram
                </a>
            </div>
          </div>

          {/* Lado Direito: Formulário */}
          <div>
            <LeadForm />
          </div>

        </div>
      </div>
    </section>
  );
}