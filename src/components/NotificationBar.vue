<template>
  <div>
    <b-alert :variant="notificationType" show dismissible>
      {{ notification.message }}
    </b-alert>
    <br />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  computed: {
    notificationType() {
      return `${this.notification.type}`;
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: mapActions("notification", ["remove"])
};
</script>
