<template>
  <div class="DesMe">
    <div class="rectangle-purple">
      <img src="https://i.postimg.cc/d1BYCcLs/Character-Drawing.png" alt="Character Drawing" class="image"/>
    </div>
    <div class="rectangle-white">
      <div class="text-black">
        <div class="name">
          <p>Atnibam</p>
          <p>Aitay</p>
        </div>
        <p class="graduation-year">2024届</p>
        <div class="text-grey">
          <p>后端开发工程师、PM</p>
          <p>软件工程 / INFJ-T / 广州</p>
          <p>一只布偶猫的铲屎官</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.DesMe {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 48.5rem;
}

p {
  margin: 0.4em 0;
}

.rectangle-purple {
  position: absolute;
  width: 27rem;
  height: 37rem;
  background-color: #63065f;
  z-index: 1;
  display: flex;
  justify-content: center;
  left: 7.5rem;
  top: -1.5rem;
}

.image {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 80%;
}

.rectangle-white {
  position: absolute;
  width: 12.5rem;
  height: auto;
  background-color: white;
  display: flex;
  justify-content: right;
  bottom: 14rem;
  right: 1.7rem;

  .name {
    color: black;
    font-family: 'Smiley Sans Oblique';
    font-size: 2.5rem;
    margin: 0.1em 0 0.7rem;
    line-height: 2rem;
  }

  .text-black {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: right;
    margin-bottom: 1rem;
    margin-top: 1rem;
    margin-right: 1.7rem;
  }

  .graduation-year {
    color: black;
    font-family: 'NotoSerifSC-SemiBold';
  }

  .text-grey {
    color: #3E3E3E;
    font-family: 'NotoSerifSC-SemiBold';
    font-size: 0.85rem;
  }
}
</style>
