<template>
  <div class="composer-detail flex rounded mt-10 mb-10 p-4">
    <div class="profile">
      <img :src="composer.img" class="profile-img rounded" />
    </div>
    <div class="details flex flex-row ml-5">
      <div class="person-details mr-10">
        <h2 class="name">{{ composer.name }}</h2>

        <div>
          <span class="item-label">Born</span>:
          {{ composer.dateOfBirth }}
        </div>
      </div>
      <div class="contact-details">
        <h4>Contact Info</h4>

        <div>
          <div>
            <span class="item-label">Phone Number</span>: (XXX) XXX-XXXX
          </div>
          <div><span class="item-label">Email</span>: some-email@gmail.com</div>

          <h5 class="mt-3">Address</h5>

          <div>
            123 Main Street<br />
            City, State Code, Zip/Postal Code
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  composer: any
}>()

const composer = computed(() => props.composer)
</script>

<style lang="scss" scoped>
.composer-detail {
  background: darken(whitesmoke, 20%);

  .profile {
    .profile-img {
      filter: grayscale(1);
    }
  }
  .name {
    font-size: 1.4em;
    font-weight: bold;
  }
}

.item-label {
  font-weight: 600;
}
</style>
