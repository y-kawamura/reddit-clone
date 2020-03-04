<template>
  <section>
    <h1>{{ subreddit.name }}</h1>
    <hr />
    <div v-if="isLoggedIn" >
      <button @click="showForm = !showForm" class="button is-primary">Toggle Form</button>
      <form v-if="showForm" @submit.prevent="onCreatePost">
        <b-field label="Title">
          <b-input v-model="post.title" required></b-input>
        </b-field>
        <b-field label="Description">
          <b-input v-model="post.description" type="textarea"></b-input>
        </b-field>
        <b-field label="URL">
          <b-input v-model="post.url" type="url"></b-input>
        </b-field>
        <button class="button is-success">Submit</button>
      </form>
      <hr />
    </div>
    <article class="media" v-for="post in posts" :key="post.id">
      <div class="media-content">
        <div class="content">
          <p>
            <strong v-if="post.url" >
              <a :href="post.url" target="_blank">{{ post.title }}</a>
            </strong>
            <strong v-else>{{ post.title }}</strong>
            <small class="is-block">
              @{{ userById(post.user_id).name }}
               {{ timeSince(post.created_at.toDate()) }}
            </small>
            {{ post.description }}
          </p>
        </div>
      </div>
      <figure class="media-right" v-if="isImage(post.url)">
        <p class="image is-128x128">
          <img :src="post.url">
        </p>
      </figure>
    </article>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import MyDate from '@/date';

export default {
  data() {
    return {
      showForm: false,
      post: {
        title: '',
        description: '',
        url: '',
      },
    };
  },
  mounted() {
    this.initSubreddit(this.$route.params.name);
    this.initUsers();
  },
  watch: {
    subreddit() {
      if (this.subreddit.id) {
        this.initPosts(this.subreddit.id);
      }
    },
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapState('auth', ['isLoggedIn']),
    ...mapGetters('subreddit', ['subreddit']),
    ...mapGetters('users', ['getUserById']),
    userById() {
      return (id) => {
        const user = this.getUserById(id);
        return user ?? { name: 'unknown user' };
      };
    },
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    ...mapActions('users', { initUsers: 'init' }),
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif|svg)$/);
    },
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.url)) {
        await this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          url: '',
        };
        this.showForm = false;
      }
    },
    timeSince(date) {
      return MyDate.timeSince(date);
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1rem;
}
</style>
