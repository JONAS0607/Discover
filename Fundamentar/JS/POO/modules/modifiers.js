function fnCapitalize(vector) {
	var modified = [];

	for (var i = 0; i < vector.length; i++) {
		var initial_letter = vector[i].charAt(0).toUpperCase();
		var rest_text = vector[i].slice(1);
		var result = initial_letter + rest_text;

		modified[i] = result;
	}
	return modified;
}

function fnCapitalize_new(collection, atribute) {
	if (typeof collection[0] == 'object') {
		var result = collection.map((obj) => {
			console.log(obj[atribute]);
			var initial_letter = obj[atribute].charAt(0).toUpperCase();
			var rest_text = obj[atribute].slice(1);

			obj[atribute] = initial_letter + rest_text;
			return obj;
		});
		console.log(result);
	} else {
		console.log(fnCapitalize(collection));
	}
}

function fnOrder(vector) {
	return vector.sort(function (a, b) {
		return a.localeCompare(b);
	});
}

function fnUpperCase(vector) {
	var modified = [];

	for (var i = 0; i < vector.length; i++) {
		modified[i] = vector[i].toUpperCase();
	}

	return modified;
}

export default {
	capitalize: fnCapitalize,
	capitalize_new: fnCapitalize_new,
	order: fnOrder,
	upper_case: fnUpperCase,
};
