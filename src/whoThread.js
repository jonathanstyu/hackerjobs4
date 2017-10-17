export default class WhoThread {}

WhoThread.schema = {
  name: "WhoThread",
  primaryKey: 'id',
  properties: {
    'by': 'string',
    'descendants': {type: 'int', default: 0},
    'id': {type: 'int', default: 0},
    'kids': 'string',
    'score': {type: 'int', default: 0},
    'title': 'string',
    'text': 'string',
    'type': 'string',
    'time': 'string'
  }
}
