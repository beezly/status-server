Template.services.services = function () {
  return Services.find({host: "Web Tests"}, {sort: {service: 1}});
}
