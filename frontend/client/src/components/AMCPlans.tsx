import React from 'react';
import ResponsiveTable from './ResponsiveTable';

const AMCPlans = () => {
  const columns = [
    { header: 'PARTICULARS', accessor: 'particular', isHeader: true },
    { header: 'PLAN 1', accessor: 'plan1' },
    { header: 'PLAN 2', accessor: 'plan2' },
    { header: 'PLAN 3', accessor: 'plan3' },
  ];

  const data = [
    { particular: 'PRICE', plan1: '₹1750', plan2: '₹2550', plan3: '₹3660' },
    { particular: 'SERVICE', plan1: 'Yes', plan2: 'Yes', plan3: 'Yes' },
    { particular: 'FILTERS', plan1: 'No', plan2: 'Yes', plan3: 'Yes' },
    { particular: 'MEMBRANE', plan1: 'No', plan2: 'No', plan3: 'Yes' },
    { particular: 'ELECTRICAL PARTS', plan1: 'No', plan2: 'Yes', plan3: 'Yes' },
    { particular: 'FAULTY PARTS', plan1: 'No', plan2: 'Yes', plan3: 'Yes' },
  ];

  return <ResponsiveTable columns={columns} data={data} title="Our RO AMC Plans" testId="table-amc-plans" />;
};

export default AMCPlans;
