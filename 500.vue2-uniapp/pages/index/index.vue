<template>
  <view class="container">

    <view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
    <text class="intro">详见：</text>
    <uni-link :href="href" :text="href"></uni-link>

    <view class="page-body">
      <view class="btn-area">
        <navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
          <button type="default">跳转到新页面</button>
        </navigator>
        <navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
          <button type="default">在当前页打开</button>
        </navigator>
        <navigator url="/pages/2048/index" open-type="redirect" hover-class="other-navigator-hover">
          <button type="default">2048</button>
        </navigator>
      </view>
    </view>
    <uni-grid :column="2" :show-border="false" :square="false" :highlight="true">
      <uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
        <navigator :url="item.url" open-type="redirect">
          <uni-card :isFull="false">
            <uni-view class="uni-flex uni-row">
              <uni-view class="text uni-flex"
                style="width: 2rem; height: 2rem; justify-content: center; align-items: center;">
                <img :src="item.ico" style="width: 2rem; height: 2rem;" />
              </uni-view>
              <uni-view class="uni-flex uni-column" style="flex: 1 1 0%; justify-content: space-between;">
                <uni-view class="text" style="text-align: left; ">{{item.text}}</uni-view>
                <uni-view class="uni-flex uni-row">
                  <uni-view class="text" style="flex: 1 1 0%;"></uni-view>
                  <uni-view class="text" style="flex: 1 1 0%;"></uni-view>
                </uni-view>
              </uni-view>
            </uni-view>
          </uni-card>
        </navigator>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        href: 'https://uniapp.dcloud.io/component/README?id=uniui',
        cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
        avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
        list: [{
            url: '/pages/2048/index',
            ico: '/static/c1.png',
            text: '2048',
            badge: '0',
            type: "primary"
          }, {
            url: '/static/c1.png',
            ico: '/static/c1.png',
            text: 'Grid 1',
            badge: '0',
            type: "primary"
          },
          {
            url: '/static/c2.png',
            ico: '/static/c2.png',
            text: 'Grid 2',
            badge: '1',
            type: "success"
          },
          {
            url: '/static/c3.png',
            text: 'Grid 3',
            badge: '99',
            type: "warning"
          },
          {
            url: '/static/c4.png',
            text: 'Grid 4',
            badge: '2',
            type: "error"
          },
          {
            url: '/static/c5.png',
            text: 'Grid 5'
          },
          {
            url: '/static/c6.png',
            text: 'Grid 6'
          },
          {
            url: '/static/c7.png',
            text: 'Grid 7'
          },
          {
            url: '/static/c8.png',
            text: 'Grid 8'
          },
          {
            url: '/static/c9.png',
            text: 'Grid 9'
          }
        ]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .container {
    padding: 20px 0;
    font-size: 14px;
    line-height: 24px;
  }

  .uni-card .uni-card__header {
    border-bottom: 0;
  }
</style>