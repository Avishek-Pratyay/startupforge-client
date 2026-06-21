const OpportunityCard = ({ opportunity }) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm">

      <h2 className="text-xl font-bold">
        {opportunity.role_title}
      </h2>

      <p className="mt-2">
        Work Type: {opportunity.work_type}
      </p>

      <p>
        Industry: {opportunity.industry}
      </p>

      <p>
        Deadline: {opportunity.deadline}
      </p>

    </div>
  );
};

export default OpportunityCard;