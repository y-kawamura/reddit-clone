import firebase from '@/firebase';
import { firestoreAction } from 'vuexfire';

import db from '@/db';

const posts = db.collection('posts');

const state = {
  matchedSubreddits: [],
  posts: [],
};

const getters = {
  // eslint-disable-next-line no-shadow
  subreddit: (state) => state.matchedSubreddits[0] ?? {},
};

const actions = {
  // eslint-disable-next-line no-shadow
  async createPost({ getters }, post) {
    const result = posts.doc();
    const newPost = Object.assign(post, {
      id: result.id,
      subreddit_id: getters.subreddit.id,
      user_id: firebase.auth().currentUser.uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    });

    try {
      await posts.doc(newPost.id).set(newPost);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
  initSubreddit: firestoreAction(({ bindFirestoreRef }, name) => {
    bindFirestoreRef('matchedSubreddits', db.collection('subreddits').where('name', '==', name));
  }),
  initPosts: firestoreAction(({ bindFirestoreRef }, subredditId) => {
    bindFirestoreRef('posts', db.collection('posts').where('subreddit_id', '==', subredditId));
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
