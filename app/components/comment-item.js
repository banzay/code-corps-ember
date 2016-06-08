import Ember from 'ember';
import CommentMentionFetcherMixin from 'code-corps-ember/mixins/comment-mention-fetcher';

export default Ember.Component.extend(CommentMentionFetcherMixin, {
  classNames: ['comment-item', 'timeline-comment-wrapper'],
  classNameBindings: ['isEditing:editing'],

  currentUser: Ember.inject.service(),

  canEdit: Ember.computed.alias('currentUserIsCommentAuthor'),
  commentAuthorId: Ember.computed.alias('comment.user.id'),
  currentUserId: Ember.computed.alias('currentUser.user.id'),
  currentUserIsCommentAuthor: Ember.computed('currentUserId', 'commentAuthorId', function() {
    let userId = parseInt(this.get('currentUserId'), 10);
    let authorId = parseInt(this.get('commentAuthorId'), 10);
    return userId === authorId;
  }),

  init() {
    this.set('isEditing', false);
    this.send('fetch', 'published');
    return this._super(...arguments);
  },

  actions: {
    cancel() {
      this.set('isEditing', false);
    },

    edit() {
      this.set('isEditing', true);
    },

    generatePreview(markdown) {
      let comment = this.get('comment');
      comment.set('markdownPreview', markdown);
      comment.set('preview', true);
      comment.save().then(() => this.send('fetch', 'preview'));
    },

    save() {
      let component = this;
      let comment = this.get('comment');
      comment.set('preview', false);
      comment.save().then(() => {
        component.set('isEditing', false);
        component.send('fetch', 'published');
      });
    },
  }
});
