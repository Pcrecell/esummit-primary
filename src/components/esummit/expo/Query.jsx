import { useState } from "react";

const Query = () => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Query submitted:", { name, email, query });
    // fetch("http://localhost:5000/api/users/submit-query", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, email, query }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       alert("Query submitted successfully!");
    //       resetForm();
    //     } else {
    //       alert("Failed to submit query. Please try again.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting query:", error);
    //     alert("An error occurred while submitting your query.");
    //   });
    // setQuery("");
    // setName("");
    // setEmail("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Have a Query?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your KIIT Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$"
          title="Please enter a valid KIIT email address"
          required
        />
        <textarea
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Type your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Query;
