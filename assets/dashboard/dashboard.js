window.renderVisitorData = function(client, timeframe) {
  var pageviewsInterval = new Dataviz()
    .height(300)
    .el('.pageviews-interval')
    .title('Pageviews by daytime')
    .type('area')
    .render();

  client
    .query('count', {
      event_collection: 'pageviews',
      timeframe: timeframe,
      interval: 'daily',
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsInterval
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsInterval
        .message(err.message);
    });

  var pageviews = new Dataviz()
    .height(300)
    .el('.total-pageviews')
    .type('metric')
    .title('Pageviews')
    .prepare();

  client
    .query('count', {
      event_collection: 'pageviews',
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviews
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviews
        .message(err.message);
    });

  var pageviewsByDay = new Dataviz()
    .height(300)
    .el('.pageviews-by-day')
    .type('horizontal-bar')
    .title('Pageviews by Day of the Week')
    .prepare();

  client
    .query('count',  {
      event_collection: 'pageviews',
      group_by: [
      'time.local.day_of_week'],
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsByDay
        .data(res)
        .labelMapping({
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday',
        '7': 'Sunday'
        })
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsByDay
        .message(err.message);
    });

  var pageviewsByBrowser = new Dataviz()
    .height(300)
    .el('.pageviews-by-browser')
    .type('pie')
    .title('Pageviews by Browser')
    .prepare();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: [
      'tech.browser.family'],
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsByBrowser
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsByBrowser
        .message(err.message);
    });

  var pageviewsByDevice = new Dataviz()
    .height(300)
    .el('.pageviews-by-device')
    .type('pie')
    .title('Pageviews by Device Family')
    .prepare();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: [
      'tech.device.family'],
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsByDevice
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsByDevice
        .message(err.message);
    });

  var popularPages = new Dataviz()
    .height(300)
    .el('.popular-pages-visited')
    .type('line')
    .chartOptions({
      axis: {
        y: {
          padding: {bottom:0}
        }
      }
    })
    .title('Popular Pages Visited by Title')
    .prepare();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: [
      'url.info.path'],
      timeframe: timeframe,
      interval: 'daily',
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      popularPages
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      popularPages
        .message(err.message);
    });

  var pageviewsByCountry = new Dataviz()
    .el('.pageviews-by-country')
    .height(300)
    .type('table')
    .title('Pageviews by Country')
    .render();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: [
      'geo.country'],
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsByCountry
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsByCountry
        .message(err.message);
    });

   var pageviewsByCity = new Dataviz()
    .el('.pageviews-by-city')
    .height(300)
    .type('table')
    .title('Pageviews by City')
    .render();

  client
    .query('count', {
      event_collection: 'pageviews',
      group_by: ['geo.city'],
      filters: [{
        'operator': 'ne',
        'property_name': 'geo.city',
        'property_value': null
      }],
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      pageviewsByCity
        .data(res)
        .sortGroups('desc')
        .render();
    })
    .catch(function(err){
      // Handle the error
      pageviewsByCity
        .message(err.message);
    });
};

window.renderPerformanceData = function(client, timeframe) {
  var responseTime = new Dataviz()
    .height(300)
    .el('.response-time')
    .title('Response time (s)')
    .type('area')
    .render();

  client
    .query('average', {
      event_collection: 'checks',
      timeframe:  'this_7_days',
      interval: 'daily',
      timezone: 'UTC',
      target_property: 'request.duration'
    })
    .then(function(res) {
        // TODO: Loop res.result and convert time to ms
        for (var i = 0; i < res.result.length; i++) {
            if (!res.result[i].value) continue;
            res.result[i].value = parseFloat(res.result[i].value.toFixed(2));
        }

        responseTime
            .data(res)
            .render();
    })
    .catch(function(err) {
      responseTime
        .message(err.message);
    });

  var avgResponse = new Dataviz()
    .height(300)
    .el('.avg-response')
    .type('metric')
    .title('avg response (ms)')
    .prepare();

  client
    .query('median', {
      event_collection: 'checks',
      timeframe: 'this_7_days',
      timezone: 'UTC',
      target_property: 'request.duration'
    })
    .then(function(res) {
        var responseInMs = (res.result * 1000).toFixed();
        res.result = parseFloat(responseInMs);

        avgResponse
            .data(res)
            .render();
    })
    .catch(function(err) {
      avgResponse
        .message(err.message);
    });
}
