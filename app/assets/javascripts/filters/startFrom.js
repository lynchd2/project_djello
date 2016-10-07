app.filter("startFrom", function() {
  return function(collection, start) {
    start += 4;
    return collection.slice(start);
  }
})
