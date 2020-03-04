<template>
  <section>
    <h1>{{ subreddit.name }}</h1>
    <hr />
    <form @submit.prevent="onCreatePost">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Description">
        <b-input v-model="post.description" type="textarea"></b-input>
      </b-field>
      <b-field label="URL">
        <b-input v-model="post.url" type="url"></b-input>
      </b-field>
      <button class="button is-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      post: {
        title: '',
        description: '',
        url: '',
      },
    };
  },
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapGetters('subreddit', ['subreddit']),
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit']),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.url)) {
        await this.createPost(this.post);
      }
    },
  },
};
</script>
