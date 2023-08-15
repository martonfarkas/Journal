// import React from 'react'

// const ShowEntry = ({ entry }) => {
//   return entry ? (
//     <>
//         <h5>{entry.content}</h5>
//         <p>Posted in {entry.category.name}</p>
//     </>
//   ) : (
//     <p>Entry not found!</p>
//   )
// }


// export default ShowEntry



import React from "react";
import { useNavigate } from "react-router-dom";

function ShowEntry({ entry, deleteEntry }) {
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteEntry(entry.id);
      nav('/'); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return entry ? (
    <div>
      <h5>{entry.content}</h5>
      <p>Posted in {entry.category.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <p>Entry not found!</p>
  );
}

export default ShowEntry;
