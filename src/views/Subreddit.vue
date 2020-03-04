<template>
  <section>
    <h1>{{ subreddit.name }}</h1>
    <hr />
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
      <button class="button is-primary">Submit</button>
    </form>
    <hr />
    <article class="media" v-for="post in posts" :key="post.id">
      <div class="media-content">
        <div class="content">
          <p>
            <strong v-if="post.url" >
              <a :href="post.url" target="_blank">{{ post.title }}</a>
            </strong>
            <strong v-else>{{ post.title }}</strong>
            <small> @{{ post.user_id }}</small>
            <small> {{ new Date(post.created_at.seconds).toLocaleString() }}</small>
            <br>
            {{ post.description }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
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
    ...mapGetters('subreddit', ['subreddit']),
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif|svg)$/);
    },
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.url)) {
        await this.createPost(this.post);
      }
    },
  },
};
</script>
