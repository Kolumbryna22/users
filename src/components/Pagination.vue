<template>
  <div class="pagination">
    <button
        v-if="pages > 1 && currentPage !== 1"
        title="Prev"
        class="btn-paginate btn-prev"
        @click="setPage(currentPage - 1)"
    >
      <i class="arrow-left" />
    </button>
    <button
        :class="currentPage == 1 ? 'btn-paginate-active' : ''"
        class="btn-paginate"
        @click="setPage(1)"
    >
      1
    </button>
    <template v-if="currentPage - 2 > 1">
      <p>
        ...
      </p>
    </template>
    <template v-for="page in pages">
      <button
          v-if="(page > 1) && (page >= currentPage - 1) && (page < pages) && (page <= currentPage + 1)"
          :key="page"
          :class="currentPage == page ? 'btn-paginate-active' : ''"
          class="btn-paginate"
          @click="setPage(page)"
      >
        {{ page }}
      </button>
    </template>
    <template v-if="currentPage + 2 < pages">
      <p>
        ...
      </p>
    </template>
    <button
        v-if="pages > 1"
        :class="currentPage == pages ? 'btn-paginate-active' : ''"
        class="btn-paginate"
        @click="setPage(pages)"
    >
      {{ pages }}
    </button>
    <button
        v-if="pages > 1 && currentPage !== pages"
        title="Next"
        class="btn-paginate btn-next"
        @click="setPage(currentPage + 1)"
    >
      <i class="arrow-right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    }
  },
  methods: {
    setPage (page) {
      if (page >= 1 && page < this.pages + 1) {
        this.$emit('updateCurrentPage', page);
      }
    }
  }
};
</script>
