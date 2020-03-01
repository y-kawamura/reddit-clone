import firebase from '@/firebase';

const state = {
  user: {},
  isLoggedIn: false,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    const setUser = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    commit('setUser', setUser);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
