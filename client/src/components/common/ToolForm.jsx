import { useEffect, useState } from "react";

const categories = [
  "Hand Tools",
  "Power Tools",
  "Measuring Tools",
  "Gardening",
  "Safety Equipment",
  "Electrical",
  "Cleaning",
  "Other",
];

const conditions = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
];

const statuses = [
  "Available",
  "Unavailable",
  "Maintenance",
];

const defaultValues = {
  name: "",
  category: "",
  description: "",
  totalQuantity: "",
  availableQuantity: "",
  condition: "Good",
  status: "Available",
  location: "",
};

const ToolForm = ({
  initialValues = defaultValues,
  onSubmit,
  onCancel,
  loading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (formData.name.trim().length < 2) {
      validationErrors.name =
        "Tool name must contain at least 2 characters.";
    }

    if (!formData.category) {
      validationErrors.category = "Category is required.";
    }

    if (
      formData.totalQuantity === "" ||
      Number(formData.totalQuantity) < 0
    ) {
      validationErrors.totalQuantity =
        "Enter a valid total quantity.";
    }

    if (
      formData.availableQuantity === "" ||
      Number(formData.availableQuantity) < 0
    ) {
      validationErrors.availableQuantity =
        "Enter a valid available quantity.";
    }

    if (
      Number(formData.availableQuantity) >
      Number(formData.totalQuantity)
    ) {
      validationErrors.availableQuantity =
        "Available quantity cannot exceed total quantity.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...formData,
      totalQuantity: Number(formData.totalQuantity),
      availableQuantity: Number(formData.availableQuantity),
    });
  };

  return (
    <form className="tool-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        name="name"
        placeholder="Tool Name"
        value={formData.name}
        onChange={handleChange}
      />

      {errors.name && (
        <small className="error-text">{errors.name}</small>
      )}

      <select
        className="form-input"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {errors.category && (
        <small className="error-text">
          {errors.category}
        </small>
      )}

      <textarea
        className="form-input"
        rows="3"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        className="form-input"
        type="number"
        name="totalQuantity"
        placeholder="Total Quantity"
        value={formData.totalQuantity}
        onChange={handleChange}
      />

      {errors.totalQuantity && (
        <small className="error-text">
          {errors.totalQuantity}
        </small>
      )}

      <input
        className="form-input"
        type="number"
        name="availableQuantity"
        placeholder="Available Quantity"
        value={formData.availableQuantity}
        onChange={handleChange}
      />

      {errors.availableQuantity && (
        <small className="error-text">
          {errors.availableQuantity}
        </small>
      )}

      <select
        className="form-input"
        name="condition"
        value={formData.condition}
        onChange={handleChange}
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>

      <select
        className="form-input"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <input
        className="form-input"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <button
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Tool"
            : "Add Tool"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default ToolForm;