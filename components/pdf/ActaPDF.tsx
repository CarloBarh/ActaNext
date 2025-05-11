// components/ActaPDF.tsx
'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

interface ActaData {
  fecha: string;
  nombreEmpleado: string;
  nombreEmpresa: string;
  equipoRecibido: string[];
}

Font.register({
  family: 'Times-Roman',
  src: 'https://fonts.gstatic.com/s/timesnewroman/v11/0aVZt3qfN6yTC-0jeW1mOs5F.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.6,
  },
  centerText: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 10,
  },
  signatureBlock: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  signatureContainer: {
    alignItems: "center",
    width: "45%",
  },
  signatureLine: {
    textAlign: 'center',
    marginTop: 30,
  },
  signatureLineText: {
    fontSize: 12,
    marginBottom: 2, // ajusta para acercar el texto
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  signatureLabel: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 0,
  },
  logo: {
    width: 64,
    height: 64,
  }
});

const ActaPDF = ({ data }: { data: ActaData }) => {

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.titleBlock}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.logo} src="/ca-logo.jpg" />
          <View>
            <Text style={[styles.bold, { fontSize: 14 }]}>{data.nombreEmpresa}</Text>
            <Text>Acta de entrega/devolución de Equipo</Text>
            <Text>Recibo de equipo de la compañía</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text><Text style={styles.bold}>Fecha:</Text> {data.fecha}</Text>
          <Text><Text style={styles.bold}>Nombre del Empleado:</Text> {data.nombreEmpleado}</Text>
          <Text><Text style={styles.bold}>Acuso de recibo de los siguientes equipos:</Text></Text>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            {data.equipoRecibido.map((item, index) => (
              <Text key={index} style={{ fontSize: 13, marginBottom: 2 }}>
                • {item}
              </Text>
            ))}
          </View>


        </View>

        <Text>
          De acuerdo con la política de uso de equipo de la compañía contenida en el manual del
          empleado, entiendo que el uso de este equipo que se me proporcionó es únicamente para el
          ejercicio de la actividad de la empresa.
        </Text>

        <Text>
          Asumo la responsabilidad por la seguridad y condición de este equipo. En el caso de perder el
          equipo, o dañarlo debido a mi negligencia me haré responsable ante la compañía por el costo de
          reparación o sustitución de dicho equipo con equivalentes.
        </Text>

        <Text>
          En caso de pérdida, robo o daño del equipo asignado, autorizo expresamente a la Compañía a realizar las deducciones correspondientes de mi salario, conforme a la legislación laboral vigente. La Compañía se compromete a coordinar conmigo los importes a deducir. Asimismo, acepto que, si la relación laboral finaliza por cualquier motivo, la Compañía podrá descontar las sumas adeudadas de mi último pago o de cualquier otro monto pendiente. Si aún existiera un saldo restante, me comprometo a cancelarlo de manera inmediata.
        </Text>

        {/* Sección Entrega del equipo */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={[styles.centerText, styles.bold]}>
            Entrega del equipo al empleado:
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureLineText}>___________________________</Text>
            <Text style={styles.signatureLabel}>Firma de Empleado</Text>
          </View>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureLineText}>___________________________</Text>
            <Text style={styles.signatureLabel}>Emitido por ICT</Text>
          </View>
        </View>

        {/* Espacio entre secciones */}
        <View style={{ marginTop: 60 }} />

        {/* Sección Regreso del equipo */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={[styles.centerText, styles.bold]}>
            Regreso del equipo a la compañía:
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureLineText}>___________________________</Text>
            <Text style={styles.signatureLabel}>Firma de Empleado</Text>
          </View>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureLineText}>___________________________</Text>
            <Text style={styles.signatureLabel}>Emitido por ICT</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default ActaPDF;
