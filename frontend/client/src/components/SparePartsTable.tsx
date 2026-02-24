import React from 'react';
import ResponsiveTable from './ResponsiveTable';

const SparePartsTable = () => {
  const columns = [
    { header: 'SERIAL NO.', accessor: 'serial', className: 'w-24' },
    { header: 'RO PARTS NAME', accessor: 'name', isHeader: true },
    { header: 'PRICE (RS.)', accessor: 'price', className: 'w-40 font-bold' },
  ];

  const data = [
    { serial: '1.', name: 'Carbon Filter', price: '₹450' },
    { serial: '2.', name: 'Sediment Filter', price: '₹450' },
    { serial: '3.', name: 'Membrane', price: '₹1250/ 1650' },
    { serial: '4.', name: 'Spun Filter', price: '₹150/ 250' },
    { serial: '5.', name: 'Adapter', price: '₹750' },
    { serial: '6.', name: 'Solenoid Valve (SV)', price: '₹450' },
    { serial: '7.', name: 'RO Pumps', price: '₹1650/1850' },
    { serial: '8.', name: 'Flow Resistor (FR)', price: '₹100' },
    { serial: '9.', name: 'Tape', price: '₹100' },
    { serial: '10.', name: 'UA Lamp', price: '₹350' },
    { serial: '11.', name: 'UV Adapter', price: '₹350' },
    { serial: '12.', name: 'Carbon, Sediment and Spun Filters', price: '₹1050' },
    { serial: '13.', name: 'Carbon, Sediment, Membrane and Spun Filters', price: '₹2250' },
  ];

  return <ResponsiveTable columns={columns} data={data} title="RO Spare Part Price List" testId="table-spare-parts" />;
};

export default SparePartsTable;
