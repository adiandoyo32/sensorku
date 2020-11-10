<template>
  <div class="login">
    <h3>DC Comics Rebirth - Covers</h3>
    <input 
      type="text" 
      v-model="email" 
      placeholder="Email address" 
      class="input" 
      required>
    <br/>
    <input 
      type="password" 
      v-model="password"
      placeholder="Password" 
      class="input" 
      required>
    <br/>
    <button v-on:click="login" class="button">Enter</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>