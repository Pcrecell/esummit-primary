const Navbar = ({ onAboutClick }) => {
  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between">
      <h1 className="text-white text-2xl">Expo Ecell</h1>
      <button
        onClick={onAboutClick}
        className="text-white hover:text-blue-200 text-lg transition"
      >
        About Us
      </button>
    </nav>
  );
};

export default Navbar;
