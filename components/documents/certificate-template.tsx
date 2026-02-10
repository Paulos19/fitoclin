/* eslint-disable jsx-a11y/alt-text */
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Registre fontes se quiser algo customizado, aqui usaremos padrão
// Font.register({ family: 'Open Sans', src: '...' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  content: {
    flex: 1,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0A311D', // Verde Fitoclin
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    letterSpacing: 2,
  },
  studentName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37', // Dourado
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#D4AF37',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
    lineHeight: 1.5,
    maxWidth: 500,
    marginBottom: 40,
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#0A311D',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  signatureLine: {
    width: 200,
    borderTop: 1,
    borderColor: '#000',
    marginTop: 40,
    textAlign: 'center',
    fontSize: 10,
    paddingTop: 5,
  },
  code: {
    fontSize: 8,
    color: '#999',
  }
});

interface CertificateTemplateProps {
  userName: string;
  courseName: string;
  date: Date;
  code: string;
  bgUrl?: string; // URL da imagem de fundo
}

export const CertificateTemplate = ({ userName, courseName, date, code, bgUrl }: CertificateTemplateProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Imagem de Fundo (Se houver, senão usa um estilo padrão) */}
      {bgUrl && (
         <Image src={bgUrl} style={styles.background} />
      )}

      <View style={styles.content}>
        {!bgUrl && (
            // Fallback visual se não tiver imagem de fundo
            <View style={{ position: 'absolute', top: 20, right: 20 }}>
                 <Text style={{ fontSize: 10, color: '#0A311D' }}>FITOCLIN ACADEMY</Text>
            </View>
        )}

        <Text style={styles.title}>CERTIFICADO DE CONCLUSÃO</Text>
        <Text style={styles.subtitle}>ESPECIALIZAÇÃO EM FITOTERAPIA</Text>

        <Text style={{ fontSize: 12, marginBottom: 10 }}>Certificamos que</Text>
        
        <Text style={styles.studentName}>{userName}</Text>

        <Text style={styles.text}>
          concluiu com êxito o curso de especialização <Text style={styles.courseTitle}>"{courseName}"</Text>,
          demonstrando dedicação e domínio dos conteúdos ministrados, totalizando a carga horária exigida.
        </Text>

        <View style={styles.footer}>
            <View>
                <Text style={styles.code}>Autenticidade: {code}</Text>
                <Text style={styles.code}>Emitido em: {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
                {/* Você pode adicionar uma imagem de assinatura aqui */}
                <Text style={styles.signatureLine}>Dra. Isa</Text>
                <Text style={{ fontSize: 8 }}>Diretora Clínica & Instrutora</Text>
            </View>
        </View>
      </View>
    </Page>
  </Document>
);