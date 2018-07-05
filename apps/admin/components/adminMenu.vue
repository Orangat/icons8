<template lang="pug">
  .admin-menu
    .title Icons8 Fortis
    .list
      a.list-item Dashboard
      a.list-item Icons
      a.list-item Users
      a.list-item Settings
      a.list-item Stats
      a.list-item Docs
      a.list-item Logout
</template>

<style lang="scss">
  .admin-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 240px;
    background: linear-gradient(to bottom, #39a6de 0%, #255fa9 100%);
    box-shadow: 0 0 48px rgba(0,0,0,0.3);

    .title {
      line-height: 64px;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      color: white;
    }

    .list {
      color: white;
    }

    .list-item {
      height: 48px;
      line-height: 48px;
    }
  }
</style>
