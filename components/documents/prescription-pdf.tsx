import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Rect
} from "@react-pdf/renderer";

// Estilos refinados para um visual "clean" e cirúrgico
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica", // Fonte segura e limpa
    flexDirection: "row",
    padding: 0, // Removemos padding da página para a sidebar encostar na borda
  },
  // --- BARRA LATERAL SÓLIDA ---
  sidebar: {
    width: 16, // Faixa fina e elegante
    height: "100%",
    backgroundColor: "#062214", // Verde Profundo da marca
  },
  // --- CONTEÚDO ---
  main: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 60,
    paddingLeft: 40,
    paddingRight: 50,
    position: "relative",
  },
  // --- MARCA D'ÁGUA ---
  watermarkContainer: {
    position: "absolute",
    top: "40%",
    left: 40,
    right: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.03, // Quase imperceptível
    zIndex: -1,
  },
  watermarkImage: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },
  // --- CABEÇALHO ---
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Alinha a base do texto com a logo
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#062214", // Linha fina preta/verde
    paddingBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  headerTexts: {
    textAlign: "right",
  },
  clinicTitle: {
    fontSize: 24,
    color: "#062214",
    fontFamily: "Times-Roman", // Serifada clássica
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  clinicSubtitle: {
    fontSize: 8,
    color: "#76A771", // Verde Lima
    marginTop: 4,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // --- DADOS DO PACIENTE (Minimalista) ---
  patientSection: {
    marginBottom: 40,
  },
  patientLabel: {
    fontSize: 8,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  patientName: {
    fontSize: 18,
    color: "#062214",
    fontFamily: "Times-Bold",
    marginBottom: 6,
  },
  patientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientMetaText: {
    fontSize: 10,
    color: "#444",
  },
  separator: {
    marginHorizontal: 10,
    color: "#CCC",
  },
  // --- CORPO DO TEXTO ---
  bodySection: {
    flex: 1, // Ocupa o espaço disponível empurrando o footer
  },
  docTitle: {
    fontSize: 12,
    color: "#062214",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    backgroundColor: "#F2F2F2", // Destaque sutil
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    fontSize: 11,
    lineHeight: 1.8,
    color: "#222",
    textAlign: "justify",
  },
  // --- RODAPÉ ---
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  doctorBlock: {
    alignItems: "flex-start",
  },
  doctorName: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    color: "#062214",
  },
  doctorCrn: {
    fontSize: 9,
    color: "#666",
    marginTop: 2,
  },
  contactBlock: {
    alignItems: "flex-end",
  },
  contactText: {
    fontSize: 8,
    color: "#999",
    marginBottom: 2,
  },
});

interface PrescriptionPDFProps {
  patientName: string;
  patientDetails?: string;
  date: Date;
  content: string;
  logoBase64?: string;
  doctorName?: string;
  crn?: string;
}

export const PrescriptionPDF = ({ 
  patientName, 
  patientDetails = "", 
  date, 
  content, 
  logoBase64,
  doctorName = "Dra. Isa",
  crn = "CRN/SP 12345"
}: PrescriptionPDFProps) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* 1. LOMBADA LATERAL (Sólida e Fina) */}
        <View style={styles.sidebar} />

        {/* 2. ÁREA PRINCIPAL */}
        <View style={styles.main}>

          {/* Marca D'água */}
          {logoBase64 && (
            <View style={styles.watermarkContainer}>
              <Image src={logoBase64} style={styles.watermarkImage} />
            </View>
          )}

          {/* Cabeçalho */}
          <View style={styles.headerRow}>
            {logoBase64 ? (
               <Image src={logoBase64} style={styles.logo} />
            ) : <View style={{ width: 60 }} />}
            
            <View style={styles.headerTexts}>
              <Text style={styles.clinicTitle}>Fitoclin</Text>
              <Text style={styles.clinicSubtitle}>Medicina Integrativa</Text>
            </View>
          </View>

          {/* Seção do Paciente */}
          <View style={styles.patientSection}>
            <Text style={styles.patientLabel}>Paciente</Text>
            <Text style={styles.patientName}>{patientName}</Text>
            
            <View style={styles.patientMetaRow}>
              <Text style={styles.patientMetaText}>
                Data: {date.toLocaleDateString('pt-BR')}
              </Text>
              {patientDetails && (
                <>
                  <Text style={styles.separator}>|</Text>
                  <Text style={styles.patientMetaText}>{patientDetails}</Text>
                </>
              )}
            </View>
          </View>

          {/* Corpo do Documento */}
          <View style={styles.bodySection}>
            <Text style={styles.docTitle}>Prescrição Terapêutica</Text>
            <Text style={styles.content}>
              {content}
            </Text>
          </View>

          {/* Rodapé Moderno */}
          <View style={styles.footer}>
            
            {/* Assinatura Digital / Médico */}
            <View style={styles.doctorBlock}>
               {/* Espaço para assinatura manual se impresso */}
               <View style={{ height: 40 }} /> 
               <Text style={styles.doctorName}>{doctorName}</Text>
               <Text style={styles.doctorCrn}>{crn}</Text>
            </View>

            {/* Contato e Info */}
            <View style={styles.contactBlock}>
               <Text style={styles.contactText}>Fitoclin Clínica Médica</Text>
               <Text style={styles.contactText}>Av. Paulista, 1000 - São Paulo, SP</Text>
               <Text style={[styles.contactText, { color: '#76A771' }]}>www.fitoclin.com.br</Text>
            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
};