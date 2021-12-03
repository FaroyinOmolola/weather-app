export const convertToF = (celsius) => {
	let fahrenheit = celsius * (9 / 5) + 32;
	return <span>{fahrenheit.toFixed(2)}&#176;F</span>;
};
export const formatDate = (date) => {
	let x = date?.split(" ");
	return x ? x[2] + " " + x[1] + ", " + x[3] : "";
};
export const convertToFarenheit = (celsius) => {
	let fahrenheit = celsius * (9 / 5) + 32;
	return fahrenheit.toFixed(2);
};

export const dateSaparation = (list) => {
	try {
		let eachDay = [];
		list.forEach((value) => {
			let date = new Date(value.dt_txt).toDateString();
			let index = eachDay.findIndex((e) => e.date === date);
			if (index !== -1) {
				eachDay[index].data.push(value);
			} else {
				eachDay.push({ date, data: [value] });
			}
		});
		return eachDay;
	} catch (err) {}
};
