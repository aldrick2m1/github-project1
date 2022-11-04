import React from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Graph =({exerDisplay, feaDisplay})=> {
	let feaSum = 0
	let exerSum = 0
	feaDisplay.forEach(e => { feaSum += e.calories})
	exerDisplay.forEach(e => { exerSum += e.calories})
		const options = {
			animationEnabled: true,
			title: {
				text: "Gained VS Burned"
			},
			subtitles: [{
				text: exerSum > feaSum ? "Eat More!" : "Exercise More!",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#' kcal'",
				dataPoints: [
		
					{ name: "Burned Calories", y: exerSum },
					{ name: "Gained Calories", y: feaSum},
			
				]
			}]
		}

		return (
		<div>
			{/* {feaDisplay.map((e)=>e.date)} */}
			<CanvasJSChart options = {options}/>
		
		</div>
		)
	}

	export default Graph


