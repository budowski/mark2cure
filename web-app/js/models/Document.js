define(['backbone', 'vent',
        //-- Data
        'models/Word', 'collections/WordList',
        'models/Annotation', 'collections/AnnotationList',
        'models/Cache', 'collections/CacheList',
        'models/User',
        //-- Utilities
        'underscore.string'],
    function(Backbone, vent,
        //-- Data
        Word, WordList,
        Annotation, AnnotationList,
        Cache, CacheList,
        User,
        //-- Utilities
        _s){
  'use strict';

  //
  //-- This model repersents the concept of a Document
  //-- -- It stores the title, original text, id and any search metadata
  //

  return Backbone.RelationalModel.extend({
    defaults: {
      title         : '',
      text          : '',
      document_id   : 0,

      //-- for now, 'complete' can live entirely clientside
      complete      : false,
      cache         : {}
    },

    relations: [{
      type: 'HasMany',
      key: 'annotations',

      relatedModel: Annotation,
      collectionType: AnnotationList,

      reverseRelation : {
        key : 'parentDocument',
        includeInJSON: true,
      }
    }, {
      type: 'HasMany',
      key: 'words',

      relatedModel: Word,
      collectionType: WordList,

      reverseRelation : {
        key : 'parentDocument',
        includeInJSON: false,
      }
    }, {
      type: 'HasOne',
      key: 'cache',

      relatedModel: Cache,
      collectionType: CacheList,

      autoFetch       : false,
      parse           : true,

      reverseRelation : {
        key : 'parentDocument',
        includeInJSON: false,
      }
    }],

    initialize : function() {
      if(this.isNew()) {
      }
      this.bind('change:complete', this.checkProgress);
      this.bind('change:text', this.parseText);
    },

    parseText : function() {
      var self = this,
          step = 0,
          length = 0,
          words = _.map(_s.words( self.get('text') ), function(word, index) {
            length = word.length;
            step = step + length + 1;
            return {
              'text'      : word,
              'position'  : index,
              'length'    : length,
              'start'     : step - length - 1,
              'stop'      : step - 2
            }
          });

        _.each(self.get('words'), function(word) {
          word.destroy();
        });
        self.get('words').add(words);
    },

    checkProgress : function() {
      if( this.collection.completed().length == 5 ) {
        vent.trigger('modal:show_complete', {});
      }
    }

  });
});