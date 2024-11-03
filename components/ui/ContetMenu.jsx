import { MoreVert } from "@mui/icons-material";

export default function ContextMenu({
  isMenuOpen,
  setIsMenuOpen,
  toggleMenu,
  repostPost,
}) {
  return (
    <div>
      {isMenuOpen ? (
        <div
          className="w-full h-[100dvh] fixed top-0 left-0 z-9"
          onClick={toggleMenu}
        ></div>
      ) : null}
      <MoreVert
        className="cursor-pointer text-light-purple hover:text-gray-700"
        onClick={toggleMenu}
      />

      {/* Context Menu */}
      {isMenuOpen && (
        <div className="relative flex-shrink-0">
          <ul
            className="absolute right-0 top-0 bg-white dark:bg-dark-surface shadow-md rounded-lg w-32 z-10"
            onClick={(e) => e.stopPropagation()} // Prevent card click on menu interaction
          >
            <li
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500 rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                repostPost();
                setIsMenuOpen(false); // Close menu after deleting
              }}
            >
              Report
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
