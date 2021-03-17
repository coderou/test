<template>
  <div class="controls">
    <input
      autocomplete="off"
      class="itxt"
      :value="newValue"
      @blur="setNewVal"
      @keyup.enter="setNewVal"
    />
    <span
      class="plus"
      @click="newValue++"
      :disabled="newValue >= max"
      :class="{ disabled: newValue >= max }"
      >+</span
    >
    <span
      class="mins"
      @click="newValue--"
      :disabled="newValue <= min"
      :class="{ disabled: newValue <= min }"
      >-</span
    >
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    max: {
      type: Number,
      default: 1000,
    },
    min: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  mounted() {
    // console.log(this);
  },
  watch: {
    newValue(newVal, oldVal) {
      // #region
      /*
        1. 如果值是非法的：10abc
          使用oldVal

        2. 如果值小于 min
          就等于min

        3. 如果值大于 max
          就等于max

        4. 如果值合法的
          就使用newVal
       */
      // #endregion
      // console.log(newVal, oldVal);
      if (newVal === oldVal) return;

      newVal = Number(newVal);
      let finalVal = newVal;

      // 1. 如果值是非法的：10abc
      if (Number.isNaN(newVal)) {
        finalVal = oldVal;
        // this.$emit("input", this.newValue);
        // this.$listeners.input(this.newValue);
        // return;
      }

      const { min, max } = this;

      // 2. 如果值小于 min
      if (newVal < min) {
        finalVal = min;
        // this.$emit("input", this.newValue);
        // return
      }

      // 3. 如果值大于 max
      if (newVal > max) {
        finalVal = max;
        // this.$emit("input", this.newValue);
        // return
      }
      finalVal = Math.ceil(finalVal); // 用户数输入小数取整
      this.newValue = finalVal;
      this.$emit('input', finalVal);
    },
  },
  methods: {
    setNewVal(e) {
      const newVal = e.target.value;
      this.newValue = newVal;
    },
  },
};
</script>

<style lang="less" scoped>
.controls {
  width: 68px;
  position: relative;
  float: left;
  margin-right: 15px;

  .itxt {
    outline: none;
    box-sizing: border-box;
    width: 58px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    border-right: 0;
    text-align: center;
  }

  span.disabled {
    cursor: not-allowed;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
  }

  .plus {
    right: -8px;
  }
}
</style>
