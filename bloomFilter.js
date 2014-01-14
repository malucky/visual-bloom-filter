var Bloomfilter = function(m, k){
  this._storage = new BloomFilterStorage(m, k);
};

Bloomfilter.prototype.add = function(string){
  this._storage.set(string);
};

Bloomfilter.prototype.query = function(string){
  return this._storage.get(string);
};