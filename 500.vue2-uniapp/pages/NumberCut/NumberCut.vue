<template>
	<view>
		<view class="content">
			<view class="drawView">
				<view class="line">
					<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
					<view v-for="(line,i) in maskMap" :key="'collimit-'+i"
					 :style="{width:getBlockSize(), height:getBlockSize()}" style="color: #aaaaaa;">{{i+1}}</view>
					<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				</view>
				<view class="line" v-for="(line,i) in userMap" :key="'userMapLine-'+i">
					<view :style="{width:getBlockSize(), height:getBlockSize()}" style="color: #aaaaaa;">{{i+1}}</view>
					<view class="block" :style="{width:getBlockSize(), height:getBlockSize()}"
					 v-for="(block,j) in line" :key="'block-'+i+'-'+j"
					 @tap="blockClick(i,j)"
					 >
						<view v-if="userMap[i][j] == -1">X</view>
						<view v-else-if="userMap[i][j] == 1" class="userMark1"></view>
						<view v-else></view>
					</view>
					<view :style="{width:getBlockSize(), height:getBlockSize()}"
					 :class="{'textGreen':isSame(false,i)}">{{getMustSum(false, i)}}</view>
				</view>
				<view class="line">
					<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
					<view v-for="(line,i) in maskMap" :key="'collimit-'+i"
					 :style="{width:getBlockSize(), height:getBlockSize()}"
					 :class="{'textGreen':isSame(true,i)}">{{getMustSum(true, i)}}</view>
					<view :style="{width:getBlockSize(), height:getBlockSize()}"></view>
				</view>
			</view>
			<view class="content">
				<view class="title">操作模式选择</view>
				<radio-group @change="modeChange">
					<radio value="0" :checked="action == 0">
						<view class="block" :style="{width:getBlockSize(), height:getBlockSize()}">
							<view>X</view>
						</view>
					</radio>
					<radio value="1" :checked="action == 1">
						<view class="block" :style="{width:getBlockSize(), height:getBlockSize()}">
							<view class="userMark1">选</view>
						</view>
					</radio>
				</radio-group>
			</view>
			<view class="content">
				<view class="title">游戏规则</view>
				<view style="width: 75%;"><b>1.</b>以上{{mapSize}}*{{mapSize}}的区域内每个方格要么选中要么不选中</view>
				<view style="width: 75%;"><b>2.</b>选择你心目中数字为1的块，尽可能使得每列每行你所选中的数字块符合边缘给定的预期数字边缘要求</view>
				<view style="width: 75%;"><b>3.</b>左上边缘显示的数字是每行每列的分值（第m行/列每个块的分值是m）</view>
				<view style="width: 75%;"><b>4.</b>右下边缘显示预期数字和——每行每列所有选中单元格值的和：例如某行是：[1,0,1,1,0]，那么预期和是8：(1*1+0*2+1*3+1*4+0*5)</view>
				<view style="width: 75%;"><b>5.</b>当所有选择数字均满足预期条件后，游戏结束</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//地图大小 n*n
				mapSize:5,
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
				this.maskMap = []
				this.userMap = []
				for(var i=0;i<this.mapSize;i++){
					this.maskMap.push([])
					this.userMap.push([])
					for(var j=0;j<this.mapSize;j++){
						this.userMap[i].push(0)
						this.maskMap[i].push(Math.random()>=0.5?1:0)
					}
				}
			},
			getBlockSize(multi=1){
				return (multi*parseInt(700/(this.mapSize+4)))+'upx'
			},
			getMustSum(isCol=false, index=0){
				var sum=0;
				if (!isCol){
					for (var i=0;i<this.mapSize;i++){
						sum += this.maskMap[index][i]*(i+1);
					}
				}
				else{
					for (var i=0;i<this.mapSize;i++){
						sum += this.maskMap[i][index]*(i+1);
					}
				}
				return sum;
			},
			getUserSum(isCol=false, index=0){
				var sum=0;
				if (!isCol){
					for (var i=0;i<this.mapSize;i++){
						sum += Math.max(this.userMap[index][i], 0)*(i+1);
					}
				}
				else{
					for (var i=0;i<this.mapSize;i++){
						sum += Math.max(this.userMap[i][index], 0)*(i+1);
					}
				}
				return sum;
			},
			isSame(isCol=false, index=0){
				var must = this.getMustSum(isCol, index)
				var user = this.getUserSum(isCol, index)
				
				return must == user;
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
					if(!this.isSame(true,i) || !this.isSame(false,i)){
						isComplete = false;
						break;
					}
				}
				if(isComplete){
					uni.showModal({
						title:'游戏结束',
						content:'你找到了所有的为1的地方',
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
