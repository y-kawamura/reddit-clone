<template>
  <section>
    <h1>{{ $route.params.name }}</h1>
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
  methods: {
    onCreatePost() {
      console.log(this.post);
    },
  },
};
</script>
