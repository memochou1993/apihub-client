<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
      >
        <AppBreadcrumbs />
      </v-flex>
      <v-flex
        xs12
      >
        <AppProgressLinear />
        <v-card
          class="pa-3"
        >
          <div
            v-if="loading"
          >
            <AppNoData />
          </div>
          <div
            v-else
          >
            <v-card-title>
              <div
                class="headline"
              >
                <v-chip
                  v-for="(method, index) in endpoint.method.split(',')"
                  :key="index"
                  :color="colorizeMethod(method)"
                  dark
                  small
                  outline
                >
                  {{ method }}
                </v-chip>
                {{ endpoint.uri }}
              </div>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="subheading"
            >
              {{ endpoint.description }}
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppProgressLinear from '@/components/AppProgressLinear.vue';
import AppNoData from '@/components/AppNoData.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';

export default {
  components: {
    AppProgressLinear,
    AppNoData,
    AppBreadcrumbs,
  },
  data() {
    return {
      endpoint: null,
    };
  },
  computed: {
    ...mapState([
      'loading',
      'refresh',
      'methodColors',
    ]),
    ...mapGetters([
      'me',
    ]),
    params() {
      return this.$route.params;
    },
    isMe() {
      return this.params.user === this.me;
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchEndpoint();
  },
  watch: {
    refresh() {
      this.$store.dispatch('setRefresh', false);
      this.fetchEndpoint();
    },
  },
  created() {
    this.fetchEndpoint();
  },
  methods: {
    goTo(location) {
      this.$router.push(location);
    },
    colorizeMethod(method) {
      return this.methodColors[method];
    },
    fetchEndpoint() {
      const user = this.isMe ? 'me' : this.params.user;
      this.$store.dispatch('fetchEndpoint', {
        url: `/users/${user}/projects/${this.params.project}/endpoints/${this.params.endpoint}`,
        params: {
          diffForHumans: true,
        },
      })
        .then(({ data }) => {
          this.endpoint = data;
        })
        .catch(() => {
          this.$router.replace({
            name: 404,
          });
        });
    },
  },
};
</script>
