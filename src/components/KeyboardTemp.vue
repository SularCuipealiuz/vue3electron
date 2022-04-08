<template>
  <section>
    <div class="keyboard">
      <div v-for="(row, rKey) in state.list" :key="rKey">
        <div class="button" v-for="(item, iKey) in row" :key="iKey" :id="iKey">
          {{ item }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { list } from "../json/keyboard.json";
import { reactive } from "vue";

export default {
  name: "KeyboardTemp",
  setup() {
    const state = reactive({
      list: list,
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: black;
  /* uncomment to this to debug in browser */
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.hidden {
  display: none !important;
}

div.container {
  display: block;
  white-space: nowrap;
}

div.keyboard {
  display: inline-block;
  margin: 10px;

  > div {
    text-align: left;
  }

  > div:not(:last-child) {
    margin-bottom: 5px;
  }

  > div:first-child {
    margin-bottom: 10px;
  }
}

div.mouse {
  display: inline-block;
  margin: 10px;
}

div.mouse > svg {
  width: 200px;
}

div.button,
div.small-button,
div.tab-button,
div.caps-button,
div.shift-button,
div.ctrl-button,
div.alt-button,
div.space-button {
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-family: Calibri;
  font-size: 20px;
  line-height: 40px;
  height: 40px;
  text-align: center;
  width: 40px;

  &[id="Tab"] {
    width: 60px;
  }

  &[id="CapsLock"] {
    width: 70px;
  }

  &[id="LeftShift"] {
    width: 90px;
  }

  &[id="LeftCtrl"] {
    width: 60px;
  }

  &[id="LeftAlt"] {
    width: 60px;
  }

  &[id="Space"] {
    width: 280px;
  }
}

div.small-button {
  line-height: 30px;
  height: 30px;
}

div.pressed {
  background-color: #2da026; /* key pressed color */
  box-shadow: 0 0 8px 3px rgba(35, 173, 278, 1); /* glow effect while holding key */
}

div.white-space {
  border: 2px solid transparent;
  display: inline-block;
  width: 40px;
}

div.line {
  height: 5px;
}

div.big-line {
  height: 15px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  transform: scale(50%);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}

div.released {
  animation: key-released 0.5s ease-out; /* animation settings for key releasing */
}

@keyframes key-released {
  from {
    background-color: #96cf13; /* key released color */
  }
  to {
    background-color: transparent;
  }
}
</style>
