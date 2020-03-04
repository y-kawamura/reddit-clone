import { firestoreAction } from 'vuexfire';

import db from '@/db';

const state = {
  users: [],
};

const getters = {
  // eslint-disable-next-line no-shadow
  getUserById: (state) => (id) => state.users.find((user) => user.id === id),
};

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', db.collection('users'));
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
