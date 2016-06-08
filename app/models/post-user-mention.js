import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  indices: attr('array'),
  username: attr('string'),

  post: belongsTo('post', { async: true }),
  user: belongsTo('user', { async: true }),
});
