<template>
  <div>
    <v-breadcrumbs
      :items="breadcrumbs"
      class="py-0"
    >
      <template
        v-slot:item="props"
      >
        <a
          :class="[props.item.disabled && 'disabled']"
          @click="goTo(props.item.location)"
        >
          {{ props.item.text }}
        </a>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  computed: {
    params() {
      return this.$route.params;
    },
    breadcrumbs() {
      return [
        {
          text: this.params.user,
          disabled: false,
          location: {
            name: 'users.show',
            params: {
              user: this.params.user,
            },
          },
        },
        {
          text: this.params.project,
          disabled: true,
          location: {
            name: 'projects.show',
            params: {
              user: this.params.user,
              project: this.params.project,
            },
          },
        },
      ];
    },
  },
  methods: {
    goTo(location) {
      this.$router.push(location);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
</style>
