<template>
  <div class="users">
    <h1>
      Tabela z użytkownikami
    </h1>
    <div class="input-container">
      <input
          id="awardId"
          v-model="searchText"
          name="awardDate"
          type="text"
          class="max-width"
      >
      <label
          for="awardId"
      >
        Wyszukaj
      </label>
    </div>
    <table>
      <thead>
        <tr>
          <th
              v-for="column in columns"
              :key="column"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="user in filteredUsers"
            :key="user.id"
        >
          <td
              v-for="column in columns"
              :key="column + user.id"
          >
            {{ user.getValue(column) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
      searchText: ''
    };
  },
  computed: {
    filteredUsers () {
      if (this.searchText !== '') {
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
  }
};
</script>
