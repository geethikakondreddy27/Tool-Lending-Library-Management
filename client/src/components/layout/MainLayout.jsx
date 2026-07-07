import Navbar from "./Navbar";
import "../../styles/layout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;