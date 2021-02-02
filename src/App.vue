<template>
  <div id="app">
    <UsersTable
        :endpoint="$store.state.api + '/users'"
        :search="true"
        :sorting="true"
        :pagination="true"
        :selected-columns="'email,name,website,address.city,company.name'"
        @currentTableUsers="currentTableUsers($event)"
    />
  </div>
</template>

<script>
import UsersTable from './components/UsersTable';

export default {
  name: 'App',
  components: {
    UsersTable
  },
  methods: {
    currentTableUsers (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
@import "./src/styles/main.scss";
</style>
