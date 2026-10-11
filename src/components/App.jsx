import React, { useState } from "react"; import hogsData from "../porkers_data";

function App() { const [hogs, setHogs] = useState(hogsData); const [greasedOnly, setGreasedOnly] = useState(false); const [sortBy, setSortBy] = useState("name"); const [selectedHog, setSelectedHog] = useState(null);

const [formData, setFormData] = useState({ name: "", weight: "", specialty: "", greased: false, image: "", medal: "", });

const visibleHogs = hogs .filter((hog) => !greasedOnly || hog.greased) .sort((a, b) => { if (sortBy === "weight") { return a.weight - b.weight; } return a.name.localeCompare(b.name); });

function handleChange(event) { const { name, value, checked, type } = event.target;

setFormData((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value, })); }

function handleSubmit(event) { event.preventDefault();

const newHog = { name: formData.name, weight: Number(formData.weight), specialty: formData.specialty, greased: formData.greased, image: formData.image || "https://raw.githubusercontent.com/learn-co-curriculum/react-hooks-hogwild/master/public/images/piglet.jpg", "highest medal achieved": formData.medal, };

setHogs((previous) => [...previous, newHog]); setFormData({ name: "", weight: "", specialty: "", greased: false, image: "", medal: "", }); }

function hideHog(name) { setHogs((previous) => previous.filter((hog) => hog.name !== name));

if (selectedHog?.name === name) { setSelectedHog(null); } }

return ( <div className="App"> <div className="navWrapper"> <span className="headerText">HogWild</span> <div className="TwirlyPig"> <img alt="piggy" className="App-logo" src="/src/assets/porco.png" /> </div> <span className="normalText"> A React App for County Fair Hog Fans </span> </div>

<h1>Hogwild: Prize-Winning Pigs!</h1>

<div> <input id="greased-filter" type="checkbox" checked={greasedOnly} onChange={(event) => setGreasedOnly(event.target.checked)} /> <label htmlFor="greased-filter">Greased Pigs Only?</label> </div>

<div> <label htmlFor="sort-hogs">Sort by:</label> <select id="sort-hogs" value={sortBy} onChange={(event) => setSortBy(event.target.value)} > <option value="name">Name</option> <option value="weight">Weight</option> </select> </div>

<h2>Add a Hog</h2>

<form onSubmit={handleSubmit}> <div> <label htmlFor="hog-name">Name:</label> <input id="hog-name" name="name" value={formData.name} onChange={handleChange} required /> </div>

<div> <label htmlFor="hog-weight">Weight:</label> <input id="hog-weight" name="weight" type="number" step="any" value={formData.weight} onChange={handleChange} required /> </div>

<div> <label htmlFor="hog-specialty">Specialty:</label> <input id="hog-specialty" name="specialty" value={formData.specialty} onChange={handleChange} required /> </div>

<div> <label htmlFor="hog-greased">Greased?</label> <input id="hog-greased" name="greased" type="checkbox" checked={formData.greased} onChange={handleChange} /> </div>

<div> <label htmlFor="hog-image">Image URL:</label> <input id="hog-image" name="image" type="url" value={formData.image} onChange={handleChange} /> </div>

<input id="hog-medal" name="medal" value={formData.medal} onChange={handleChange} />

<button type="submit">Add Hog</button> </form>

<div className="ui grid container"> {visibleHogs.map((hog) => ( <div key={hog.name} aria-label="hog card" className="ui card eight wide column" > <div style={{ cursor: "pointer" }} onClick={() => setSelectedHog( selectedHog?.name === hog.name ? null : hog ) } > <div className="image"> <img alt={"Photo of " + hog.name} src={hog.image} /> </div>

<div className="content"> <h3 className="header">{hog.name}</h3>

{selectedHog?.name === hog.name && ( <div> <p>Specialty: {hog.specialty}</p> <p>{hog.weight}</p> <p>{hog.greased ? "Greased" : "Nongreased"}</p> <p>{hog["highest medal achieved"]}</p> </div> )} </div> </div>

<div className="extra content"> <button type="button" onClick={() => hideHog(hog.name)} > Hide Me </button> </div> </div> ))} </div> </div> ); }

export default App;