<template>
  <!-- 输入框 -->
  <mm_item>
    <mm_side v-if="icon">
      <mm_icon :icon="icon"></mm_icon>
    </mm_side>
    <mm_main>
      <div class="mm_title" v-if="title">{{ title }}</div>
      <mm_group v-if="type == 'text' || type == 'number' || type == 'password'">
        <input type="text" :value="value" :maxlength="max" :placeholder="desc" v-if="type == 'text'" @input="$emit('input', $event.target.value)"></input>
        <input type="number" :value="value" :max="len(max)" :maxlength="max" :placeholder="desc" v-else-if="type == 'number'"
          @input="$emit('input', $event.target.value)"></input>
        <input type="password" :value="value" :maxlength="max" :placeholder="desc" v-else-if="type == 'password'"
          @input="$emit('input', $event.target.value)"></input>
        <input :type="type" :value="value" :maxlength="max" :placeholder="desc" @input="$emit('input', $event.target.value)"
          v-else></input>
        <slot></slot>
      </mm_group>
    </mm_main>
    <mm_tip v-if="tip" v-html="tip"></mm_tip>
  </mm_item>
</template>

<script>
  import mixin from '@/mixins/form'

  export default {
    mixins: [mixin],
    methods: {
      len(max) {
        return Math.pow(10, max);
      }
    }
  }
</script>

<style>
</style>
