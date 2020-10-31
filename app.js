// Use the D3 library to read in samples.json.
d3.json("data/samples.json").then((importData) => {
	console.debug(importData);
	var data = importData[0];

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
	// get all the names/IDs and add them as options in the dropdown menu
	var names = data.names; 
	names.forEach(function(name) {
		d3.select("#selDataset").append("option").text(name)
	}); 
}); 


