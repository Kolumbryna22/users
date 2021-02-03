<template>
  <div class="users">
    <h1>
      Tabela z użytkownikami
    </h1>
    <div
        v-if="search"
        class="input-container"
    >
      <input
          id="awardId"
          v-model="searchText"
          name="awardDate"
          type="text"
          class="max-width"
          @input="currentPage = 1"
      >
      <label
          for="awardId"
      >
        Szukaj
      </label>
    </div>
    <table>
      <thead>
        <tr>
          <th
              v-for="column in columns"
              :key="column"
              @click="sortKey = column, asc = !asc"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody v-if="paginatedUsers.length > 0">
        <tr
            v-for="user in paginatedUsers"
            :key="user.id"
        >
          <td
              v-for="column in columns"
              :key="column + user.id"
          >
            <template v-if="column === 'email'">
              <a :href="'mailto:' + user.getValue(column)">
                {{ user.getValue(column) }}
              </a>
            </template>
            <template v-else>
              {{ user.getValue(column) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-if="paginatedUsers.length <= 0">
      Brak użytkowników
    </h3>
    <Pagination
        v-if="pagination"
        :current-page="currentPage"
        :pages="pages"
        @updateCurrentPage="updateCurrentPage($event)"
    />
  </div>
</template>

<script>
import Pagination from './Pagination';

class User {
  constructor (data) {
    this.id = data?.id || '';
    this.email = data?.email || '';
    this.name = data?.name || '';
    this.website = data?.website || '';
    this.address = new Address(data?.address || '');
    this.company = new Company(data?.company || '');
  }

  getValue (key) {
    const keyArray = key.split('.');

    if (keyArray.length > 1) {
      return this[keyArray[0]][keyArray[1]];
    }

    return this[key];
  }
}

class Address {
  constructor (data) {
    this.city = data?.city || '';
  }
}

class Company {
  constructor (data) {
    this.name = data?.name || '';
  }
}

export default {
  name: 'Users',
  components: {
    Pagination
  },
  props: {
    endpoint: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    },
    sorting: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    selectedColumns: {
      type: String,
      default: 'email,name,website,address.city,company.name'
    }
  },
  data () {
    return {
      users: [],
      columns: this.selectedColumns.split(','),
      searchText: '',
      currentPage: 1,
      itemsPerPage: 3,
      sortKey: '',
      asc: true
    };
  },
  computed: {
    filteredUsers () {
      if (this.searchText !== '' && this.search) {
        const searchTerm = this.searchText.toLowerCase().trim();

        return this.users.filter((user) => {
          return (user.email !== null && user.email.toLowerCase().includes(searchTerm)) ||
            (user.name !== null && user.name.toLowerCase().includes(searchTerm)) ||
            (user.website !== null && user.website.toLowerCase().includes(searchTerm)) ||
            (user.address.city !== null && user.address.city.toLowerCase().includes(searchTerm)) ||
            (user.company.name !== null && user.company.name.toLowerCase().includes(searchTerm));
        });
      }

      return this.users;
    },
    sortedUsers () {
      let users = this.filteredUsers;

      if (this.sorting && this.sortKey !== '') {
        const keyArray = this.sortKey.split('.');

        if (keyArray.length > 1) {
          return users.sort((a, b) => {
            if (a[keyArray[0]][keyArray[1]] < b[keyArray[0]][keyArray[1]]) {
              return this.asc ? -1 : 1;
            }

            if (a[keyArray[0]][keyArray[1]] > b[keyArray[0]][keyArray[1]]) {
              return this.asc ? 1 : -1;
            }

            return 0;
          });
        }

        return users.sort((a, b) => {
            if (a[keyArray[0]] < b[keyArray[0]]) {
              return this.asc ? -1 : 1;
            }

            if (a[keyArray[0]] > b[keyArray[0]]) {
              return this.asc ? 1 : -1;
            }

            return 0;
          });
      }

      return users;
    },
    paginatedUsers () {
      this.$emit('currentTableUsers', this.sortedUsers);

      if (this.pagination) {
        return this.sortedUsers.slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage);
      }

      return this.sortedUsers;
    },
    pages () {
      return Math.ceil(this.sortedUsers.length / this.itemsPerPage);
    }
  },
  mounted () {
    const self = this;

    this.axios.get(this.endpoint)
      .then((res) => {
        self.users = res.data.map(user => new User(user));
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    updateCurrentPage (page) {
      this.currentPage = page;
    }
  }
};
</script>
