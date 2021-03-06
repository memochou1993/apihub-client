<template>
  <div>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
      >
        <AppProgressLinear />
        <v-card>
          <v-data-table
            :items="projects"
            :headers="headers"
            hide-actions
          >
            <template
              v-slot:items="props"
            >
              <td
                class="text-xs-center"
              >
                {{ props.item.id }}
              </td>
              <td
                class="text-xs-left"
              >
                {{ props.item.name }}
              </td>
              <td
                class="text-xs-right"
              >
                {{ props.item.created_at }}
              </td>
              <td
                class="text-xs-right"
              >
                {{ props.item.updated_at }}
              </td>
              <td
                class="text-xs-center"
              >
                <v-icon
                  v-if="props.item.private"
                  id="private"
                  color="primary lighten-1"
                >
                  lock
                </v-icon>
                <v-icon
                  v-else
                  color="primary lighten-1"
                >
                  lock_open
                </v-icon>
              </td>
              <td
                class="text-xs-center"
              >
                <v-btn
                  icon
                  @click="viewProject(props.item.id)"
                >
                  <v-icon
                    color="primary lighten-1"
                  >
                    visibility
                  </v-icon>
                </v-btn>
              </td>
            </template>
            <template
              v-slot:no-data
            >
              <AppNoData />
            </template>
          </v-data-table>
        </v-card>
        <div
          class="text-xs-center ma-3"
        >
          <v-pagination
            v-if="pages > 1"
            v-model="page"
            :length="pages"
            @input="onPageChange"
          />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppProgressLinear from '@/components/AppProgressLinear.vue';
import AppNoData from '@/components/AppNoData.vue';

export default {
  components: {
    AppProgressLinear,
    AppNoData,
  },
  data() {
    return {
      projects: [],
      headers: [
        {
          text: 'ID', value: 'id', align: 'center', sortable: false,
        },
        {
          text: 'Name', value: 'name', align: 'left', sortable: false,
        },
        {
          text: 'Created at', value: 'created_at', align: 'right', sortable: false,
        },
        {
          text: 'Updated at', value: 'updated_at', align: 'right', sortable: false,
        },
        {
          text: 'Private', value: 'private', align: 'center', sortable: false,
        },
        {
          text: 'Detail', value: '', align: 'center', sortable: false,
        },
      ],
      paginate: 10,
      page: 1,
    };
  },
  computed: {
    ...mapState([
      'refresh',
      'pages',
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
  watch: {
    $route() {
      this.fetchProjects();
    },
    refresh() {
      this.$store.dispatch('setRefresh', false);
      this.fetchProjects();
    },
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    onPageChange() {
      this.fetchProjects();
    },
    fetchProjects() {
      const user = this.isMe ? 'me' : this.params.user;
      this.$store.dispatch('fetchProjects', {
        url: `/users/${user}/projects`,
        params: {
          paginate: this.paginate,
          page: this.page,
          diffForHumans: true,
        },
      })
        .then(({ data }) => {
          this.projects = data;
        });
    },
    viewProject(id) {
      this.$router.push({
        name: 'projects.show',
        params: {
          user: this.params.user,
          project: id,
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
#private
  cursor default
</style>
