

Template.services.services = function () {
  return Services.find({host: "Web Tests"}, {sort: {service: 1}});
}

function getState(state) {
	var statemap = []
	statemap[0] = "OK";
	statemap[1] = "WARNING";
	statemap[2] = "CRITICAL";
	statemap[3] = "UNKNOWN";
	return statemap[state];
}