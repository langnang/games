<template>
	<view class="content">
		<view class="noticeView">
			<view class="textBlack" @tap="randomNotice()">剩余提示次数: {{nowNoticeNum}}</view>
		</view>
		<view class="drawView">
			<view v-for="(line,i) in userMap" :key="'line-'+i" class="line">
				<view v-for="(block,j) in line" :key="'block-'+i+'-'+j" class="block"
				 :style="getBlockStyle(j,i)">
					<view v-if="block == -1"
					 :class="{'textRed':hitSame(i,j),'textGrey':!hitSame(i,j)}">{{numberMap[i][j]}}</view>
					<view v-else-if="block > 0" 
					 :class="{'textRed':hitSame(i,j)}"
					 @tap="blockClick(i,j)">{{block}}</view>
					<view v-else @tap="blockClick(i,j)"></view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">操作模式选择</view>
			<radio-group  style="width: 75%;" @change="modeChange">
				<radio v-for="(act) in getActions()" style="margin: 5px;"
				 :value="act" :key="'act-'+act" :checked="action == act">
					<view v-if="act == 0">清除</view>
					<view v-else :class="hasFull(parseInt(act))?'textGreen':'textBlack'">{{act}}</view>
				</radio>
			</radio-group>
		</view>
		<view class="content">
			<view class="title">游戏规则</view>
			<view style="width: 75%;"><b>1.</b>以上{{minMapSize[0]*minMapSize[1]}}*{{minMapSize[0]*minMapSize[1]}}的区域内缺失的单元格需要填入1~{{minMapSize[0]*minMapSize[1]}}的数字</view>
			<view style="width: 75%;"><b>2.</b>要求同行、同列、同一个{{minMapSize[0]}}*{{minMapSize[1]}}的实线方框中不能同时出现相同的数字</view>
			<view style="width: 75%;"><b>3.</b>全部填完，游戏过关</view>
		</view>
	</view>
</template>

<script>
	// import {DanceLinkX} from './dance_x.js'
	export default {
		data() {
			return {
				//用户数字地图
				userMap:[],
				//原始数字地图
				numberMap:[],
				//动作
				action:"0",
				//遮盖阈值
				coverThreshold:0.5,
				//最小图块的面积n*m
				minMapSize:[3,3],
				//提示次数：
				maxNoticeNum:3,
				nowNoticeNum:0,
			}
		},
		onLoad() {
			this.initMaps()
			// console.log(DanceLinkX)
		},
		methods: {
			initMaps(){
				this.nowNoticeNum = this.maxNoticeNum;
				this.userMap = []
				this.numberMap = []
				//生成用户地图：0表示可以填入，-1表示不可以填入
				for (var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
					this.userMap.push([])
					this.numberMap.push([])
					for (var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
						this.userMap[i].push(Math.random()>this.coverThreshold?0:-1)
						this.numberMap[i].push(0)
					}
				}
				//生成底层数字地图
				//参考：https://www.ocf.berkeley.edu/~arel/sudoku/main.html
				this.numberMap = this.initNumbeMap()
			},
			initNumbeMap(){
				for(var time=0;time<1000;time++){
					var rows = []
					var columns = []
					var squares = []
					var puzzle = []
					for(var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
						rows.push([])
						columns.push([])
						squares.push([])
						puzzle.push([])
						for(var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
							rows[i].push(j+1)
							columns[i].push(j+1)
							squares[i].push(j+1)
							puzzle[i].push(0)
						}
					}
					for(var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
						for(var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
							var choices = []
							var si = parseInt(i/this.minMapSize[0])*this.minMapSize[0]+parseInt(j/this.minMapSize[1])
							// console.log(i,j,si);
							for (var k=1;k<this.minMapSize[0]*this.minMapSize[1]+1;k++){
								if (rows[i].indexOf(k)>=0 && 
									columns[j].indexOf(k)>=0 &&
									squares[si].indexOf(k)>=0){
										choices.push(k)
									}
							}
							// console.log(rows[i],columns[j],squares[si],choices);
							if(choices.length == 0) continue;
							var choice = choices[parseInt(Math.random()*choices.length)]
							puzzle[i][j] = choice;
							rows[i].splice(rows[i].indexOf(choice),1)
							columns[j].splice(columns[j].indexOf(choice),1)
							squares[si].splice(squares[si].indexOf(choice),1)
						}
					}
					var theRes = JSON.stringify(puzzle)
					if(theRes.split("0").length == 1) break;
				}
				return puzzle;
			},
			getBlockSize(){
				return parseInt(700/(this.minMapSize[0]*this.minMapSize[1]+1))+'upx'
			},
			getBlockStyle(i,j){
				return {
					width: this.getBlockSize(),
					height: this.getBlockSize(),
					borderLeft: (i%this.minMapSize[0]==0)?'#000 2px solid':'#d6d6d6 1px solid',
					borderRight: (i%this.minMapSize[0]==this.minMapSize[0]-1)?'#000 2px solid':'#d6d6d6 1px solid',
					borderTop: (j%this.minMapSize[1]==0)?'#000 2px solid':'#d6d6d6 1px solid',
					borderBottom: (j%this.minMapSize[1]==this.minMapSize[1]-1)?'#000 2px solid':'#d6d6d6 1px solid'
				}
			},
			//随机提示
			randomNotice(){
				if(this.nowNoticeNum>0){
					var unMarkBlocks = []
					var unInitBlocks = []
					for(var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
						for(var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
							if(this.userMap[i][j] == 0){
								unMarkBlocks.push([i,j])
							}
							if(this.userMap[i][j] != -1){
								unInitBlocks.push([i,j])
							}
						}
					}
					if(unMarkBlocks.length > 0){
						var randomBlock = unMarkBlocks[parseInt(Math.random()*unMarkBlocks.length)]
						this.userMap[randomBlock[0]][randomBlock[1]] = -1;
					}
					else{
						var randomBlock = unInitBlocks[parseInt(Math.random()*unInitBlocks.length)]
						this.userMap[randomBlock[0]][randomBlock[1]] = -1;
					}
					this.nowNoticeNum --;
					this.$forceUpdate()
				}
			},
			blockClick(i,j){
				// console.log(i,j,this.action);
				if(this.userMap[i][j] != -1){
					if (this.userMap[i][j] != this.action)
						this.userMap[i][j] = parseInt(this.action);
					else
						this.userMap[i][j] = 0;
					this.$forceUpdate()
				}
				//结果判断
				var canPass = true;
				for(var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
					for(var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
						// if(this.userMap[i][j] != -1 && this.userMap[i][j] != this.numberMap[i][j]){
						// 	canPass = false;
						// 	break;
						// }
						if(this.hitSame(i,j) || this.userMap[i][j] == 0){
							canPass = false;
							break;
						}
					}
				}
				if(canPass){
					uni.showModal({
						title:'游戏结束',
						content:'你完成了关卡',
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
			},
			getActions(){
				var acts = []
				for(var i=0;i<this.minMapSize[0]*this.minMapSize[1]+1;i++){
					acts.push(i+"")
				}
				return acts;
			},
			hasFull(num){
				var sum = 0
				for(var i=0;i<this.minMapSize[0]*this.minMapSize[1];i++){
					for(var j=0;j<this.minMapSize[0]*this.minMapSize[1];j++){
						if(this.userMap[i][j] == num || (this.numberMap[i][j] == num && this.userMap[i][j] == -1)){
							sum ++;
						}
					}
				}
				return sum == this.minMapSize[0]*this.minMapSize[1]
			},
			modeChange(e){
				this.action = e.detail.value;
			},
			hitSame(i,j){
				// 判断是否存在同行同列或同单元格一致的用户填入数据
				var needNum = this.userMap[i][j]>=0?this.userMap[i][j]:this.numberMap[i][j]
				//求左上角的点
				var block_x = parseInt(i/this.minMapSize[0])*this.minMapSize[0]
				var block_y = parseInt(j/this.minMapSize[1])*this.minMapSize[1]
				if(needNum == 0) return false;
				for (var k=0;k<this.minMapSize[0]*this.minMapSize[1];k++){
					//行
					var theNum = this.userMap[i][k]>=0?this.userMap[i][k]:this.numberMap[i][k]
					if(theNum == needNum && theNum > 0 && j != k) return true;
					//列
					theNum = this.userMap[k][j]>=0?this.userMap[k][j]:this.numberMap[k][j]
					if(theNum == needNum && theNum > 0 && i != k) return true;
					//单元格内
					var thex = block_x+parseInt(k%this.minMapSize[1])
					var they = block_y+parseInt(k/this.minMapSize[0])
					theNum = this.userMap[thex][they]>=0?this.userMap[thex][they]:this.numberMap[thex][they]
					if(theNum == needNum && theNum > 0 && !(i == thex && j == they)) {
						// console.log(i,j,block_x,block_y,thex,they)
						return true;
					}
				}
				return false;
			},
		}
	}
</script>

<style>
	.noticeView{
		display: flex;
		flex-direction: row-reverse;
		width: 90%;
		padding: 5%;
	}
	
	.textRed{
		color: #f00;
	}
	
	.textBlack{
		color: #000000;
	}
	
	.textGrey{
		color: #6889b5;
	}
	
	.textGreen{
		color: #4CD964;
	}
	
	.textOrange{
		color: #F0AD4E;
	}
</style>
