import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image, 
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    flexDirection: "row",
    padding: 0,
  },
  sidebar: {
    width: 16,
    height: "100%",
    backgroundColor: "#062214",
  },
  main: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 60,
    paddingLeft: 40,
    paddingRight: 50,
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    top: "40%",
    left: 40,
    right: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.03,
    zIndex: -1,
  },
  watermarkImage: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#062214",
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
    fontFamily: "Times-Roman",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  clinicSubtitle: {
    fontSize: 8,
    color: "#76A771",
    marginTop: 4,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // --- DADOS DO PACIENTE ---
  patientSection: {
    marginBottom: 40,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 4,
  },
  patientLabel: {
    fontSize: 8,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  patientName: {
    fontSize: 16,
    color: "#062214",
    fontFamily: "Times-Bold",
    marginBottom: 4,
  },
  patientInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  patientMetaText: {
    fontSize: 9,
    color: "#555",
  },
  // --- CORPO ---
  bodySection: {
    flex: 1,
  },
  docTitle: {
    fontSize: 12,
    color: "#062214",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    backgroundColor: "#F2F2F2",
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
  doctorRole: {
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
  patientEmail?: string | null;
  patientPhone?: string | null;
  date: Date;
  content: string;
  logoBase64?: string;
  doctorName?: string;
  doctorRole?: string;
}

export const PrescriptionPDF = ({ 
  patientName, 
  patientDetails, 
  patientEmail,
  patientPhone,
  date, 
  content, 
  logoBase64,
  doctorName = "Profissional de Saúde",
  doctorRole = "Especialista em Medicina Integrativa"
}: PrescriptionPDFProps) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar} />
        <View style={styles.main}>
          {logoBase64 && (
            <View style={styles.watermarkContainer}>
              <Image src={logoBase64} style={styles.watermarkImage} />
            </View>
          )}

          <View style={styles.headerRow}>
            {logoBase64 ? (
               <Image src={logoBase64} style={styles.logo} />
            ) : <View style={{ width: 60 }} />}
            <View style={styles.headerTexts}>
              <Text style={styles.clinicTitle}>Fitoclin</Text>
              <Text style={styles.clinicSubtitle}>Saúde & Longevidade</Text>
            </View>
          </View>

          <View style={styles.patientSection}>
            <Text style={styles.patientLabel}>Paciente</Text>
            <Text style={styles.patientName}>{patientName}</Text>
            <View style={styles.patientInfoRow}>
              <Text style={styles.patientMetaText}>Data: {date.toLocaleDateString('pt-BR')}</Text>
              {patientDetails && <Text style={styles.patientMetaText}>• {patientDetails}</Text>}
              {patientPhone && <Text style={styles.patientMetaText}>• {patientPhone}</Text>}
              {patientEmail && <Text style={styles.patientMetaText}>• {patientEmail}</Text>}
            </View>
          </View>

          <View style={styles.bodySection}>
            <Text style={styles.docTitle}>Prescrição Terapêutica</Text>
            <Text style={styles.content}>{content}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.doctorBlock}>
               <View style={{ height: 40 }} /> 
               <Text style={styles.doctorName}>{doctorName}</Text>
               <Text style={styles.doctorRole}>{doctorRole}</Text>
            </View>
            <View style={styles.contactBlock}>
               <Text style={styles.contactText}>Documento gerado digitalmente pela plataforma Fitoclin</Text>
               <Text style={[styles.contactText, { color: '#76A771' }]}>www.fitoclin.com.br</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};