<template>
  <div class="layout">
    <header>
      <h1>TinkerSpace</h1>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      © 2026 TinkerSpace
    </footer>
  </div>
</template>

<style scoped>
.layout{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}

header{
    padding:20px;
    background:#222;
    color:white;
}

main{
    flex:1;
    padding:20px;
}

footer{
    padding:20px;
    background:#111;
    color:#888;
}
</style>