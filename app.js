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

	// select handle when change dropdown menu
	d3.selectAll("#selDataset").on("change", init);

	// function is called when a dropdown menu item is selected
	function init() {

		// select the dropdown menu
		var inputElement = d3.select("#selDataset");

		// Assign the value of the dropdown menu option to a variable
		var inputValue = inputElement.property("value");
		console.debug(inputValue);

		// Filter the dataset based on inputValue ID
		var dataset = data.samples.filter(sample => sample.id === inputValue)[0];
		console.debug(dataset);

		// Select all sample_values, otu_ids and otu_labels of the selected test ID
		var allSampleValues = dataset.sample_values;
		var allOtuIds = dataset.otu_ids;
		var allOtuLabels = dataset.otu_labels;

		// Select the top 10 OTUs value and their ID and Label
		var top10Values = allSampleValues.slice(0, 10).reverse();
		var top10Ids = allOtuIds.slice(0, 10).reverse();
		var top10Labels = allOtuLabels.slice(0, 10).reverse();

		console.debug(top10Values);
		console.debug(top10Ids);
		console.debug(top10Labels);

		// bar chart 
		var trace1 = {
			x: top10Values,
			y: top10Ids.map(outId => `OTU ${outId}`),
			text: top10Labels,
			type: "bar",
			orientation: "h"
		};

		var barData = [trace1];

		var barLayout = {
			xaxis: {title: "Sample Value"},
			autosize: false
		}
		// plot to the div tag with id "bar"
		Plotly.newPlot("bar", barData, barLayout);

		// bubble chart 
		var trace2 = {
			x: allOtuIds,
			y: allSampleValues,
			mode: 'markers',
			marker: {
				size: allSampleValues,
				color: allOtuIds
			},
			text: allOtuLabels
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
			xaxis: {title: "OTU ID"},
			showlegend: false
		};
		
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);

		// demographic information 
		var metainfo = data.metadata.filter(sample => sample.id == inputValue)[0];

		// Clear current contents 
		d3.select("#sample-metadata").html("");
		
		// Display each key-value pair from the metadata JSON object
		Object.entries(metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
	}
	init();
}); 

