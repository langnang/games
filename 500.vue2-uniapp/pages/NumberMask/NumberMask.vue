<template>
	<view class="content">
		<view class="drawView">
			<view class="line">
				<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				<view v-for="(line,i) in numberMap" :key="'userSum-col-'+i"
				 :style="{width:getBlockSize(),height:getBlockSize()}"
				 :class="getSumColor(true,i)"
				>{{getUserSum(true, i)}}</view>
			</view>
			<view class="line">
				<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				<view v-for="(line,i) in numberMap" :key="'mustSum-col-'+i"
				 :style="{width:getBlockSize(), height:getBlockSize()}"
				>{{getMustSum(true, i)}}</view>
			</view>
			<view class="line" v-for="(line,i) in numberMap" :key="'line-'+i">
				<view :style="{width:getBlockSize(), height:getBlockSize()}"
				 :class="getSumColor(false, i)"
				 >{{getUserSum(false, i)}}</view>
				<view :style="{width:getBlockSize(), height:getBlockSize()}">{{getMustSum(false, i)}}</view>
				<view v-for="(block,j) in line" :key="'number-'+i+'-'+j" class="block"
				 :style="{width:getBlockSize(), height:getBlockSize()}"
				 @tap="blockClick(i,j)"
				>
					<view :class="{'userMark1':userMap[i][j]==-1, 'userMark2':userMap[i][j]==1}"
					 >{{block}}</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">操作模式选择</view>
			<radio-group @change="modeChange">
				<radio value="0" :checked="action == 0">
					<view class="block" :style="{width:getBlockSize(), height:getBlockSize()}">
						<view class="userMark1">排</view>
					</view>
				</radio>
				<radio value="1" :checked="action == 1">
					<view class="block" :style="{width:getBlockSize(), height:getBlockSize()}">
						<view class="userMark2">选</view>
					</view>
				</radio>
			</radio-group>
		</view>
		<view class="content">
			<view class="title">游戏规则</view>
			<view style="width: 75%;"><b>1.</b>以上{{mapSize}}*{{mapSize}}的区域内，存在多个数字宝箱</view>
			<view style="width: 75%;"><b>2.</b>选择你心目中数字块，尽可能使得每列每行你所选中的数字块的和等于边缘给定的预期数字</view>
			<view style="width: 75%;"><b>3.</b>当一行或一列数字块和等于边上预期数字时，用户选择数字块的和将显示绿色；当小于时显示橘色；当超过时，显示红色</view>
			<view style="width: 75%;"><b>4.</b>当所有选择数字和均满足条件后，游戏结束</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//地图大小 n*n
				mapSize:5,
				//数字地图
				numberMap:[],
				//标记地图
				maskMap:[],
				//用户标注地图
				userMap:[],
				//操作模式
				action:"1",
			}
		},
		onLoad() {
			this.initMaps()
		},
		methods: {
			initMaps(){
				this.numberMap = []
				this.maskMap = []
				this.userMap = []
				for(var i=0;i<this.mapSize;i++){
					this.numberMap.push([])
					this.maskMap.push([])
					this.userMap.push([])
					for(var j=0;j<this.mapSize;j++){
						this.userMap[i].push(0)
						this.maskMap[i].push(Math.random()>=0.5?1:0)
						this.numberMap[i].push(parseInt(Math.random()*9)+1)
					}
				}
			},
			getBlockSize(){
				return parseInt(700/(this.mapSize+4))+'upx'
			},
			getMustSum(isCol=false, index=0){
				var sum=0;
				if (!isCol){
					for (var i=0;i<this.mapSize;i++){
						sum+=this.maskMap[index][i]*this.numberMap[index][i]
					}
				}
				else{
					for (var i=0;i<this.mapSize;i++){
						sum+=this.maskMap[i][index]*this.numberMap[i][index]
					}
				}
				return sum;
			},
			getUserSum(isCol=false, index=0){
				var sum=0;
				if (!isCol){
					for (var i=0;i<this.mapSize;i++){
						sum+=(this.userMap[index][i]>0?1:0)*this.numberMap[index][i]
					}
				}
				else{
					for (var i=0;i<this.mapSize;i++){
						sum+=(this.userMap[i][index]>0?1:0)*this.numberMap[i][index]
					}
				}
				return sum;
			},
			getSumColor(isCol=false, index=0){
				if (this.getUserSum(isCol, index) < this.getMustSum(isCol, index)) return 'textOrange';
				if (this.getUserSum(isCol, index) > this.getMustSum(isCol, index)) return 'textRed';
				return 'textGreen';
			},
			modeChange(e){
				this.action = e.detail.value;
			},
			blockClick(i,j){
				if(this.action == 0){
					if(this.userMap[i][j] == -1) this.userMap[i][j] = 0;
					else this.userMap[i][j] = -1;
				}
				else{
					if(this.userMap[i][j] == 1) this.userMap[i][j] = 0;
					else this.userMap[i][j] = 1;
				}
				this.$forceUpdate()
				//判断游戏是否完成
				var isComplete = true;
				// for(var i=0;i<this.mapSize;i++){
				// 	for(var j=0;j<this.mapSize;j++){
				// 		if(this.maskMap[i][j] == 1 && this.userMap[i][j] <= 0){
				// 			isComplete = false;
				// 			break;
				// 		}
				// 	}
				// }
				for (var i=0;i<this.mapSize;i++){
					if(this.getMustSum(true,i) != this.getUserSum(true,i) || 
					 this.getMustSum(false,i) != this.getUserSum(false,i)){
						isComplete = false;
						break;
					}
				}
				if(isComplete){
					uni.showModal({
						title:'游戏结束',
						content:'你找到了所有的宝物',
						confirmText:'再来一局',
						cancelText:'返回',
						success: (res) => {
							if(res.confirm){
								this.initMaps()
							}
							else if(res.cancel){
								uni.navigateBack()
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	
</style>
