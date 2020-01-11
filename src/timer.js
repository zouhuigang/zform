//952750120@qq.com
const zjq = require('jquery');
// var iTime = 60;
class Timeer {
	constructor(form_id, buttonID, _iTime) {
		this._iTime = parseInt(_iTime);
		this.Account = null
		this.buttonID = buttonID
		this.OldTime = parseInt(_iTime);
		this.form_id = form_id;
	}

	setiTime(newiTime) {
		this._iTime = newiTime;
		return this._iTime
	}
	getiTime(){
		return this._iTime;
	}
	
	Start() {
		let __this = this;

		if (this._iTime<=0) {
			clearTimeout(this.Account);
			__this.TimerFunc()
		}else{
			this.Account = setTimeout(() => {
				__this.TimerFunc()
			},1000);//只会执行一次
		}
	}
	
	TimerFunc() {
		//初始化参数
		let iTime = this.setiTime(this._iTime-1);
		let sTime = '';

		if ( iTime >0 ) {
			zjq("#" + this.buttonID).removeAttr("onclick"); 
			let iSecond = parseInt(iTime%60);
			let iMinute = parseInt(iTime/60)
			if (iSecond >= 0){
				if(iMinute>0){
					sTime = iMinute + "分" + iSecond + "秒";
				}else{
					sTime = iSecond + "秒";
				}
			}
			this.Start();//继续下一秒
		}else{
			zjq("#"+this.buttonID).attr("onclick","return zform.Core.SendCode('"+this.form_id+"', '"+this.buttonID+"');"); 
			sTime='重新获取';
		}
		zjq("#" + this.buttonID).val(sTime);
	}
}

//倒计时
exports.Timeer = Timeer