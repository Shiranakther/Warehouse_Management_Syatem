import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flexGrow: 1,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
});

const WorkerlistPDFReport = ({ staffList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Worker List</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cell}>Type</Text>
          <Text style={styles.cell}>Number</Text>
          <Text style={styles.cell}>Email</Text>
          <Text style={styles.cell}>Address</Text>
          <Text style={styles.cell}>Join Date</Text>
          <Text style={styles.cell}>License</Text>
        </View>
        {staffList.map((staff) => (
          <View style={styles.row} key={staff._id}>
            <Text style={styles.cell}>{staff.username}</Text>
            <Text style={styles.cell}>{staff.id}</Text>
            <Text style={styles.cell}>{staff.type}</Text>
            <Text style={styles.cell}>{staff.number}</Text>
            <Text style={styles.cell}>{staff.email}</Text>
            <Text style={styles.cell}>{staff.address}</Text>
            <Text style={styles.cell}>{staff.joindate}</Text>
            <Text style={styles.cell}>{staff.license}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default WorkerlistPDFReport;
