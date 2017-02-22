import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  keyForAttribute(key) {
    return key.decamelize();
  },

  keyForRelationship(key) {
    return key.decamelize();
  },
});
