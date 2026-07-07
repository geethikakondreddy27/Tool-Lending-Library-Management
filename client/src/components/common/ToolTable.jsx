const ToolTable = ({ tools, onEdit, onDelete }) => {
  return (
    <table className="tool-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Category</th>
          <th>Location</th>
          <th>Total</th>
          <th>Available</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tools.map((tool) => (
          <tr key={tool._id}>
            <td>{tool.toolCode}</td>

            <td>{tool.name}</td>

            <td>{tool.category}</td>

            <td>{tool.location || "-"}</td>

            <td>{tool.totalQuantity}</td>

            <td>{tool.availableQuantity}</td>

            <td>{tool.status}</td>

            <td>
              <button className="btn btn-edit" onClick={() => onEdit(tool)}>
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onDelete(tool._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToolTable;
