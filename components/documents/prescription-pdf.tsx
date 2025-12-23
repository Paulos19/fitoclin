"use client";

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: 20,
    height: "100%",
    backgroundColor: "#2A5432",
  },
  main: {
    padding: 40,
    flexGrow: 1,
    flexDirection: "column",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  watermarkImage: {
    width: 400,
    opacity: 0.03,
    transform: "rotate(-45deg)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  clinicTitleBlock: {
    flexDirection: "column",
  },
  clinicName: {
    fontSize: 22,
    color: "#062214",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  clinicSubtitle: {
    fontSize: 9,
    color: "#76A771",
    marginTop: 2,
    textTransform: "uppercase",
  },
  doctorInfo: {
    textAlign: "right",
  },
  doctorName: {
    fontSize: 12,
    color: "#062214",
    fontFamily: "Helvetica-Bold",
  },
  doctorCrm: {
    fontSize: 9,
    color: "#666",
    marginTop: 2,
  },
  documentTitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#2A5432",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 30,
    letterSpacing: 2,
  },
  patientCard: {
    backgroundColor: "#F3F8F4",
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: "#76A771",
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 9,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 11,
    color: "#1F2937",
    fontFamily: "Helvetica-Bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentBody: {
    fontSize: 12,
    lineHeight: 1.8,
    color: "#374151",
    textAlign: "justify",
  },
  signatureBlock: {
    marginTop: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 8,
  },
  signatureText: {
    fontSize: 10,
    color: "#333",
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: "#9CA3AF",
  },
});

interface PrescriptionProps {
  patientName: string;
  date: Date;
  content: string;
  logoBase64: string; // Nova prop
}

export const PrescriptionPDF = ({ patientName, date, content, logoBase64 }: PrescriptionProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      <View style={styles.sidebar} />

      <View style={styles.main}>
        
        {/* Marca D'água (Só renderiza se tiver base64) */}
        {logoBase64 && (
          <View style={styles.watermarkContainer}>
            <Image src={logoBase64} style={styles.watermarkImage} />
          </View>
        )}

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* Logo usando Base64 */}
            {logoBase64 ? (
               <Image src={logoBase64} style={styles.logo} />
            ) : (
               // Fallback: Quadrado verde se a imagem falhar
               <View style={{ width: 60, height: 60, backgroundColor: "#2A5432", borderRadius: 8 }} />
            )}
            
            <View style={styles.clinicTitleBlock}>
              <Text style={styles.clinicName}>Fitoclin</Text>
              <Text style={styles.clinicSubtitle}>Saúde Integrativa</Text>
            </View>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dra. Isa</Text>
            <Text style={styles.doctorCrm}>CRM/SP 123.456</Text>
            <Text style={{ fontSize: 8, color: "#76A771", marginTop: 2 }}>Fitoterapia Clínica</Text>
          </View>
        </View>

        <Text style={styles.documentTitle}>Prescrição Médica</Text>

        <View style={styles.patientCard}>
          <View style={styles.patientRow}>
            <View>
              <Text style={styles.label}>Paciente</Text>
              <Text style={styles.value}>{patientName}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.label}>Data do Atendimento</Text>
              <Text style={styles.value}>{date.toLocaleDateString("pt-BR")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 10, color: "#2A5432", marginBottom: 10, fontFamily: "Helvetica-Bold" }}>
            USO INTERNO / EXTERNO
          </Text>
          <Text style={styles.contentBody}>
            {content || "Nenhuma prescrição registrada."}
          </Text>
        </View>

        <View style={styles.signatureBlock}>
           <View style={styles.signatureLine} />
           <Text style={styles.signatureText}>Dra. Isa</Text>
           <Text style={{ fontSize: 8, color: "#666" }}>Médica Responsável</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fitoclin - Av. Paulista, 1000 - São Paulo/SP</Text>
          <Text style={styles.footerText}>www.fitoclin.com.br • (11) 99999-9999</Text>
        </View>

      </View>
    </Page>
  </Document>
);