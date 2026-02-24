import React from "react";

const ServiceCharges = () => {
  const domesticData = [
    { type: "RO REPAIR", charge: "₹150 + Spare Parts Cost" },
    { type: "RO SERVICE", charge: "₹150 + Spare Parts Cost" },
    { type: "RO INSTALLATION", charge: "₹400 + Spare Parts Cost" },
    { type: "RO UN-INSTALLATION", charge: "₹200" },
    { type: "RO INSTALLATION & UN-INSTALLATION", charge: "₹500 + Spare Parts Cost" },
  ];

  const commercialData = [
    { type: "RO MACHINE UPTO 50 LPH REPAIR & SERVICE", charge: "₹199" },
    { type: "RO MACHINE 100–250 LPH REPAIR & SERVICE", charge: "₹249" },
    { type: "RO MACHINE 500–1000 LPH REPAIR & SERVICE", charge: "₹499" },
    { type: "RO MACHINE 1000+ LPH REPAIR & SERVICE", charge: "₹1499" },
  ];

  const Table = ({ title, data }: any) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-medium">Service Type</th>
              <th className="px-6 py-4 font-medium text-right">Charges</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row: any, i: number) => (
              <tr
                key={i}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 text-white">{row.type}</td>
                <td className="px-6 py-4 text-right font-semibold text-white">
                  {row.charge}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-10" data-testid="service-charges">
      <Table
        title="Domestic RO Service Charges in Delhi"
        data={domesticData}
      />

      <p className="text-center text-sm text-neutral-500 italic">
        RO Repair Service Charges in Delhi, RO Repair Cost in Delhi, RO Service Cost in Delhi.
      </p>

      <Table
        title="Commercial RO Service Charges in Delhi"
        data={commercialData}
      />
    </div>
  );
};

export default ServiceCharges;
