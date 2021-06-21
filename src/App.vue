<template>
  <w-app>
    <div id="app">
      <Container />
    </div>
  </w-app>
</template>

<script>
import Container from "./components/Container.vue";

export default {
  name: "App",
  components: {
    Container,
  },
};
</script>

<style lang="scss">
$s1: 6px;
$s2: 12px;
$s3: 18px;
$s4: 24px;
$s5: 42px;
$bck: #cdf8ff;
$txtc: rgb(89, 59, 255);
$pc: #a0a4d9;
$sc: #3c5cbd;
$bdr: 3px solid
  rgba(
    $color: rgb(119, 0, 255),
    $alpha: 0.35,
  );
body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $bck;
  color: $txtc;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    ul {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $bdr;
        padding: $s2 $s4;
        border-radius: $s1;
        margin-bottom: $s2;
        span {
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
        }
        button {
          font-size: $s2;
          padding: $s1;
        }
      }
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 14px;
        font-weight: bold;
      }
      input,
      button {
        height: $s5;
        box-shadow: none;
        outline: none;
        padding-left: $s2;
        padding-right: $s2;
        border-radius: $s1;
        font-size: 18px;
        margin-top: $s1;
        margin-bottom: $s2;
      }
      input {
        background-color: transparent;
        border: $bdr;
        color: inherit;
      }
    }
    button {
      cursor: pointer;
      background-color: $pc;
      border: 1px solid $pc;
      color: $sc;
      font-weight: bold;
      outline: none;
      border-radius: $s1;
    }
    h1 {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    h2 {
      font-size: 22px;
      border-bottom: $bdr;
      padding-bottom: $s1;
    }
    h4 {
      text-align: center;
      opacity: 0.5;
      margin: 0;
    }
  }
}
</style>
