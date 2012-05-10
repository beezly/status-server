var statemap = [];
statemap[0] = "OK";
statemap[1] = "WARNING";
statemap[2] = "CRITICAL";
statemap[3] = "UNKNOWN";

function getServices() {
  Meteor.http.call('GET', 'http://status.shef.ac.uk/vshell/index.php?type=services&mode=json', function (error, result) {
    var resJSON = result.data;
    _.each(resJSON, function(data) {
      var host = data["host_name"];
      if (host == 'Web Tests') {
        var service = data["service_description"];
        var hardState = statemap[data["last_hard_state"]];
        var currState = statemap[data["current_state"]];

        var record = Services.findOne({host: host, service: service});

        if (!record) {
          // It didn't exist, we must create it
   	      Services.insert({host: host, service: service, hardState: hardState, currState: currState},function() {});
        } else { 
          if ( (record.currState != currState) || (record.hardState != hardState) ) {
            Services.update({host: host, service: service}, {host: host, service: service, hardState: hardState, currState: currState},function(){});
          }
        }
      }
    });
  });
} 

Meteor.startup(function () {
  Meteor.setInterval(getServices,10000);
});