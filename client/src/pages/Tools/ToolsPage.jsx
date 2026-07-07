import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ToolForm from "../../components/common/ToolForm";
import {
  getTools,
  createTool,
  updateTool,
  deleteTool,
} from "../../services/toolService";
import useAuth from "../../hooks/useAuth";
import ToolTable from "../../components/common/ToolTable";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Toast from "../../components/common/toast";

const ToolsPage = () => {
  const { user } = useAuth();

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState(null);

  useEffect(() => {
    fetchTools(1, "");
  }, []);

  const fetchTools = async (page = 1, searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      console.log("[Telemetry] User viewed Tool Inventory");

      const response = await getTools(page, searchValue);

      setTools(response.tools);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error(err);
      setError("Unable to load tools.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchTools(1, search);
  };

  const handleClearSearch = () => {
    setSearch("");
    fetchTools(1, "");
  };

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  const handleCreateTool = async (toolData) => {
    try {
      setSaving(true);

      await createTool(toolData);

      showToast("success", "Tool created successfully.");
      setShowForm(false);

      fetchTools(currentPage, search);
    } catch (err) {
      console.error(err);

      showToast(
        "error",
        err?.response?.data?.message || "Unable to create tool.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditTool = (tool) => {
    setEditingTool(tool);
    setShowForm(true);
  };

  const handleUpdateTool = async (toolData) => {
    try {
      setSaving(true);

      await updateTool(editingTool._id, toolData);

      showToast("success", "Tool updated successfully.");

      setEditingTool(null);
      setShowForm(false);

      fetchTools(currentPage, search);
    } catch (err) {
      console.error(err);

      showToast(
        "error",
        err?.response?.data?.message || "Unable to update tool.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTool = (toolId) => {
    setSelectedToolId(toolId);
    setShowDeleteModal(true);
  };

  const confirmDeleteTool = async () => {
    try {
      await deleteTool(selectedToolId);

      showToast("success", "Tool deleted successfully.");

      fetchTools(currentPage, search);
    } catch (err) {
      console.error(err);

      showToast(
        "error",
        err?.response?.data?.message || "Unable to delete tool.",
      );
    } finally {
      setShowDeleteModal(false);
      setSelectedToolId(null);
    }
  };

  return (
    <MainLayout>
      <Toast show={toast.show} type={toast.type} message={toast.message} />

      <h2 className="page-title">Tool Inventory</h2>

      <p className="page-subtitle">
        Manage all tools available in the inventory.
      </p>

      {user?.role === "admin" && (
        <div className="card">
          {!showForm ? (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Add Tool
            </button>
          ) : (
            <>
              <ToolForm
                initialValues={editingTool || undefined}
                isEdit={Boolean(editingTool)}
                loading={saving}
                onSubmit={editingTool ? handleUpdateTool : handleCreateTool}
                onCancel={() => {
                  setEditingTool(null);
                  setShowForm(false);
                }}
              />
            </>
          )}
        </div>
      )}

      <div className="card">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="form-input"
            placeholder="Search by tool name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Search
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </form>
      </div>

      {loading && <div className="card">Loading tools...</div>}

      {!loading && error && <div className="card">{error}</div>}

      {!loading && !error && tools.length === 0 && (
        <div className="card">
          <h3>No Tools Found</h3>

          <p>No tools matched your search.</p>
        </div>
      )}

      {!loading && !error && tools.length > 0 && (
        <div className="card">
          <div className="table-container">
            <ToolTable
              tools={tools}
              onEdit={handleEditTool}
              onDelete={handleDeleteTool}
            />
          </div>

          {totalPages > 1 && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => {
                  fetchTools(currentPage - 1, search);
                }}
              >
                Previous
              </button>

              <span
                style={{
                  alignSelf: "center",
                  fontWeight: "600",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => {
                  fetchTools(currentPage + 1, search);
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Tool"
        message="Are you sure you want to delete this tool? This action cannot be undone."
        onConfirm={confirmDeleteTool}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedToolId(null);
        }}
      />
    </MainLayout>
  );
};

export default ToolsPage;
