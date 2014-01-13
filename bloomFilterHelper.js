var BloomFilterStorage = function(storageSize) {
  this.storage = [];
  this.max = storageSize;
  for(var i = 0; i<this.max; i++){
    this.storage.push(false);
  }
};

BloomFilterStorage.prototype.hash1 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

BloomFilterStorage.prototype.hash2 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return (hash >> 14) % max;
};

BloomFilterStorage.prototype.hash3 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return (hash >> 12) % max;
};

BloomFilterStorage.prototype.set = function(string){
  var iOne = this.hash1(string, this.max);
  var iTwo = this.hash2(string, this.max);
  var iThree = this.hash3(string,this.max);
  this.storage[iOne] = true;
  this.storage[iTwo] = true;
  this.storage[iThree] = true;
}

BloomFilterStorage.prototype.get = function(string) {
  var allTrue = false;
  var iOne = this.hash1(string, this.max);
  var iTwo = this.hash2(string, this.max);
  var iThree = this.hash3(string, this.max);

  if (this.storage[iOne] && this.storage[iTwo] && this.storage[iThree]) {
    allTrue = true;
  }
  return allTrue;
};
















