import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface Producto {
    cantidad: string;
    descripcion: string;
    destino: string;
}

interface RequisicionPDFProps {
    data: {
        empresa: string;
        fecha: string;
        de: string;
        tipo: string;
        productos: Producto[];
        observaciones: string;
    };
    numero: string;
}

const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 12,
      fontFamily: 'Times-Roman',
    },
    header: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
      textTransform: 'uppercase',
      fontSize: 14,
    },
    table: {
      border: '1px solid black',
      width: '100%',
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      minHeight: 18,
      alignItems: 'center',
    },
    cell: {
      border: '1px solid black',
      padding: 4,
    },
    cantidadCol: {
      flex: 1, // columna pequeña
    },
    descripcionCol: {
      flex: 4, // columna más ancha
    },
    destinoCol: {
      flex: 1, // tamaño medio
    },
    bold: {
      fontWeight: 'bold',
    },
    firmaSection: {
      marginTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    firmaIndividual: {
      width: '30%',
    },
    firmaCentro: {
      marginTop: 40,
      textAlign: 'center',
    },
    line: {
      marginBottom: 2,
    },
  
});

export default function RequisicionPDF({ data, numero }: RequisicionPDFProps) {
    const productosConFilasVacias = [...(data?.productos || [])];

    while (productosConFilasVacias.length < 18) {
        productosConFilasVacias.push({ cantidad: '', descripcion: '', destino: '' });
    }

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View>
                    <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>No. {numero}</Text>
                    <Text style={styles.header}>Comprobante de Requisición</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* Columna izquierda */}
                        <View style={{ flex: 3 }}>
                            <Text><Text style={styles.bold}>Empresa:</Text> {data.empresa}</Text>
                            <Text><Text style={styles.bold}>De:</Text> {data.de}</Text>
                        </View>

                        {/* Columna derecha */}
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text><Text style={styles.bold}>Fecha:</Text> {data.fecha}</Text>
                            <Text><Text style={styles.bold}>Tipo:</Text> {data.tipo}</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
  <View style={[styles.row, styles.bold]}>
    <Text style={[styles.cell, styles.cantidadCol]}>Cantidad</Text>
    <Text style={[styles.cell, styles.descripcionCol]}>Descripción</Text>
    <Text style={[styles.cell, styles.destinoCol]}>Destino</Text>
  </View>

  {productosConFilasVacias.map((prod, index) => (
    <View key={index} style={styles.row}>
      <Text style={[styles.cell, styles.cantidadCol]}>
        {prod.cantidad || ' '}
      </Text>
      <Text style={[styles.cell, styles.descripcionCol]}>
        {prod.descripcion || ' '}
      </Text>
      <Text style={[styles.cell, styles.destinoCol]}>
        {prod.destino || ' '}
      </Text>
    </View>
  ))}
</View>



                    {data.observaciones && (
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.bold}>Observaciones:</Text>
                            <Text>{data.observaciones}</Text>
                        </View>
                    )}

                    <View style={styles.firmaSection}>
                        <View style={styles.firmaIndividual}>
                            <Text style={styles.line}>___________________________</Text>
                            <Text>Recibió</Text>
                        </View>
                        <View style={styles.firmaIndividual}>
                            <Text style={styles.line}>___________________________</Text>
                            <Text>Solicita</Text>
                        </View>
                    </View>

                    <View style={styles.firmaCentro}>
                        <Text style={styles.line}>___________________________</Text>
                        <Text>Autorizado</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
