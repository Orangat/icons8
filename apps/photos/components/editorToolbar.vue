<template lang="pug">
  .editor-toolbar(v-bind:style="position" v-show="isShown")
    .action(v-on:click="toggleOpacity")
      .icon(v-html="icons.opacity")

    .action(v-on:click="moveUp")
      .icon(v-html="icons.up")

    .action(v-on:click="moveDown")
      .icon(v-html="icons.down")

    .action(v-on:click="remove")
      .icon(v-html="icons.remove")
</template>

<script>
  import up from '../assets/svg/up.svg'
  import down from '../assets/svg/down.svg'
  import remove from '../assets/svg/remove.svg'
  import opacity from '../assets/svg/opacity.svg'

  export default {
    name: 'editorToolbar',
    props: {
      stage: Object,
      element: Object,
      show: Boolean,
      scale: {
        default: 1
      }
    },
    data () {
      return {
        icons: {
          up,
          down,
          remove,
          opacity
        },
        width: 28,
        height: 112,
        position: {
          top: '10px',
          left: '10px'
        },
        isShown: false
      }
    },
    watch: {
      show () {
        console.log('this.show', this.show)
        if (this.show) {
          if (this.element) {
            this.calculatePosition()
            this.isShown = this.show
          }
        } else {
          this.isShown = this.show
        }
      },
      element () {
        if (this.element) {
          console.log('this.element', this.element)
          this.calculatePosition()
        }
      }
    },
    mounted () {
      console.log('mounted this.scale', this.scale)
    },
    methods: {
      calculatePosition () {
        const group = this.element.group
        const node = this.element.node
        const groupPosition = group.getAbsolutePosition()
        const nodePosition = node.getPosition()

        let left = groupPosition.x + nodePosition.x + node.width() + 8
        const width = this.stage.width()
        const leftLimit = width - this.width - 4
        if (left < 0) left = 4
        if (left > leftLimit) left = leftLimit

        let top = groupPosition.y + nodePosition.y// - node.height()
        const height = this.stage.height()
        const limitTop = height - this.height - 4
        if (top < 0) top = 4
        if (top > limitTop) top = limitTop

        console.log('this.scale', this.scale)
        console.log('left', left)
        console.log('top', top)
        console.log('groupPosition.x', groupPosition.x)
        console.log('nodePosition.x', nodePosition.x)
        console.log('node.width()', node.width())
        console.log('node.getAbsoluteScale()', node.getAbsoluteScale().x)

        this.position.left = left + 'px'
        this.position.top = top + 'px'
      },
      remove () {
        console.log('remove')
        this.$emit('remove')
      },
      moveUp () {
        console.log('moveUp')
        this.element.group.moveUp()
        this.stage.draw()
      },
      moveDown () {
        console.log('moveDown')
        this.element.group.moveDown()
        this.stage.draw()
      },
      toggleOpacity () {
        if (this.element.group.opacity() === 1) {
          this.element.group.opacity(0.75)
        } else {
          this.element.group.opacity(1)
        }
        this.stage.draw()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor-toolbar {
    position: absolute;
    z-index: 1;
    background-color: rgba(240,240,240,0.9);
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);

    .action {
      padding: 6px;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }
      transition: 0.3s all ease;
    }
    .icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
