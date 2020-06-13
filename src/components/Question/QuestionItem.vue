<template>
  <component :is="componentName" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
  import SingleChoice from "./SingleChoice";
  import MultiChoice from "./MultiChoice";
  import TextQuestion from "./TextQuestion";

  export default {
    name: "QuestionItem",
    props: ['type'],
    components: {
      SingleChoice,
      MultiChoice,
      TextQuestion,
    },
    data() {
      return {
        componentName: ''
      }
    },
    created() {
      switch (this.type) {
        case 0:
          this.componentName = 'SingleChoice';
          break;
        case 1:
          this.componentName = 'MultiChoice';
          break;
        case 2:
          this.componentName = 'TextQuestion';
          break;
      }
    }
  }
</script>

<style scoped>

</style>
