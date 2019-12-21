function size (collection) {
  const type = Object.prototype.toString.call(collection).substr(8).replace(']', '')
  if (type === 'Array' || type === 'String') return collection.length
  if (type === 'Object') return Object.keys(collection).length
  if (type === 'Map' || type === 'Set') return collection.size
}
module.exports = size
