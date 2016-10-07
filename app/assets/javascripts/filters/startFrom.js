app.filter("startFrom", function() {
  return function(collection, start) {
    if (collection) {
      return collection.slice(start);
      start += 4;
    }
  }
})
