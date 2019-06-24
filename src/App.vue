<template>
  <div id="app">
    <div id="nav">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
