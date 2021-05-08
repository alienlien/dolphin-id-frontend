import React from 'react';

function RegionHeader() {
	const headers = [
		'Index',
		'Upper Left X',
		'Upper Left Y',
		'Width',
		'Height',
		'Group ID',
		'Ku ID',
		'Prediction',
		'Delete',
	]
	return <thead>
		<tr>
			{headers.map(
				(msg, index) => <th key={index}>{msg}</th>
			)}
		</tr>
	</thead>
}

export default RegionHeader