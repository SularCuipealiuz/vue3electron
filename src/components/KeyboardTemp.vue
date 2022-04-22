<template>
  <section>
    <div class="keyboard">
      <div
        :class="{ 'function-row': rKey === 0 }"
        v-for="(row, rKey) in keyboard"
        :key="rKey"
      >
        <div
          class="button"
          :class="{ 'small-size': rKey === 0 }"
          v-for="(item, iKey) in row"
          :key="iKey"
          :id="iKey"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { list } from "../json/keyboard.json";
import { ref } from "vue";

const keyboard = ref(list);
function listenWebSocket() {
  let state = {};
  let ws = new WebSocket("ws://" + location.host + "/ws");
  ws.onopen = function () {
    ws.send(JSON.stringify({ listen: "Keyboard" }));
  };
  ws.onmessage = function (event) {
    let data = JSON.parse(event.data);

    if (data.type == "Ping") {
      // reply to ping messages
      ws.send(JSON.stringify({ ping: data.ping }));
      return;
    }

    if (data.type == "Keyboard") {
      if (data.pressed) {
        state[data.button] = true;
        let element = document.getElementById(data.button);
        if (element) {
          element.classList.remove("released");
          element.classList.add("pressed");
        }
      } else {
        if (state[data.button]) {
          delete state[data.button];
          let element = document.getElementById(data.button);
          if (element) {
            element.classList.remove("pressed");
            element.classList.add("released");
          }
        }
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  listenWebSocket();
});
</script>

<style lang="scss" scoped>
section {
  background-color: black;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 816px;
}

div.keyboard {
  display: flex;
  flex-direction: column;
  margin: 10px;
  white-space: nowrap;

  > div {
    text-align: left;

    > div:not(:last-child) {
      margin-right: 4px;
    }
  }

  > div.function-row {
    > .small-size {
      height: 30px;
      line-height: 30px;
    }

    > [id="Esc"] {
      margin-right: 30px;
    }

    > [id="F4"],
    > [id="F8"] {
      margin-right: 24px;
    }
  }

  > div:not(:last-child) {
    margin-bottom: 5px;
  }

  > div:first-child {
    margin-bottom: 10px;
  }
}

div.button,
div.small-button,
div.tab-button,
div.caps-button,
div.shift-button,
div.ctrl-button,
div.alt-button,
div.space-button {
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  display: inline-block;
  font-family: Calibri;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  text-align: center;
  width: 40px;
  user-select: none;

  &[id="Tab"],
  &[id="LeftCtrl"],
  &[id="RightCtrl"],
  &[id="LeftAlt"],
  &[id="RightAlt"],
  &[id="Backspace"] {
    width: 60px;
  }

  &[id="CapsLock"] {
    width: 70px;
  }

  &[id="Enter"] {
    width: 76px;
  }

  &[id="LeftShift"] {
    width: 90px;
  }

  &[id="RightShift"] {
    width: 102px;
  }

  &[id="Space"] {
    width: 280px;
  }

  &[id="LeftCtrl"],
  &[id="RightAlt"] {
    margin-right: 61px !important;
  }

  &[id="Up"] {
    margin-left: 48px !important;
  }
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
