// components/pdf/VentaPDF.tsx
'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Registrar fuente Times New Roman
Font.register({
  family: 'Times-Roman',
  src: 'https://fonts.gstatic.com/s/timesnewroman/v11/0aVZt3qfN6yTC-0jeW1mOs5F.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 14,
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'left',
  },
  bulletItem: {
    marginLeft: 20,
  },
  signatureBlock: {
    marginTop: 20,
  },
  signatureText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'left',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
  },
  signatureLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

type Props = {
  data: {
    descripcion: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    nombreEquipo: string;
    fechaEntrega: string;
    motivoEntrega: string;
    estadoGeneral: string;
  };
};

const VentaPDF = ({ data }: Props) => {
  return (
    <Document>
      <Page size={{ width: 816, height: 1056 }} style={styles.page}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
          Documento de Entrega de Equipo de Cómputo
        </Text>

        <Text style={styles.sectionTitle}>Datos del Equipo:</Text>
        <View style={styles.bulletItem}>
          <Text>• Descripción del Equipo: {data.descripcion}</Text>
          <Text>• Marca: {data.marca}</Text>
          <Text>• Modelo: {data.modelo}</Text>
          <Text>• Número de Serie: {data.numeroSerie}</Text>
          <Text>• Nombre equipo: {data.nombreEquipo}</Text>
          <Text>• Fecha de entrega: {data.fechaEntrega}</Text>
        </View>

        <Text style={styles.sectionTitle}>Motivo de la Entrega:</Text>
        <Text>{data.motivoEntrega}</Text>

        <Text style={styles.sectionTitle}>Verificación del Estado del Equipo:</Text>
        <View style={styles.bulletItem}>
          <Text>• Estado General del Equipo: {data.estadoGeneral}</Text>
        </View>

        <Text style={styles.sectionTitle}>Firmas:</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          {/* Columna izquierda */}
          <View style={{ width: '48%' }}>
            <Text style={styles.signatureLabel}>Responsable de la Entrega:</Text>
            <View style={{ height: 40, justifyContent: 'flex-end' }}>
              <View style={styles.signatureLine} />
            </View>
            <Text style={styles.signatureText}>Firma</Text>

            <View style={{ height: 40 }} />

            <Text style={styles.signatureLabel}>Departamento de Contabilidad:</Text>
            <View style={{ height: 40, justifyContent: 'flex-end' }}>
              <View style={styles.signatureLine} />
            </View>
            <Text style={styles.signatureText}>Firma</Text>
          </View>

          {/* Columna derecha */}
          <View style={{ width: '48%' }}>
            <Text style={styles.signatureLabel}>Responsable de la Recepción:</Text>
            <View style={{ height: 40, justifyContent: 'flex-end' }}>
              <View style={styles.signatureLine} />
            </View>
            <Text style={styles.signatureText}>Firma</Text>

            <View style={{ height: 40 }} />

            <Text style={styles.signatureLabel}>Gerente General:</Text>
            <View style={{ height: 40, justifyContent: 'flex-end' }}>
              <View style={styles.signatureLine} />
            </View>
            <Text style={styles.signatureText}>Firma</Text>
          </View>
        </View>


      </Page>
    </Document>
  );
};

export default VentaPDF;
