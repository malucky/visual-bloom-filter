var Bloomfilter = function(buckets){
  this.buckets = buckets || 18
  this._storage = new BloomFilterStorage(buckets)
}

Bloomfilter.prototype.add = function(string){
  this._storage.set(string)
}

Bloomfilter.prototype.query = function(string){
  return this._storage.get(string)
}