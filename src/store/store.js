// 自定义的简单状态管理模式，其实就是单例模式
var store = {
  debug: true,
  state: {
    user: {
      userName: '',
      isLogin: false,
      role: ''
    }
  },
  setUserNameAction (userName) {
    if (this.debug) console.log('setUserNameAction triggered with', userName);
    this.state.user.userName = userName;
    localStorage.userName = userName; // 储存到本地缓存中
  },
  setIsLoginAction (isLogin) {
    if (this.debug) console.log('setIsLoginAction triggered with', isLogin);
    this.state.user.isLogin = isLogin;
    localStorage.isLogin = isLogin; // 储存到本地缓存中
  },
  setRoleAction (role) {
    if (this.debug) console.log('setRoleAction triggered with', role);
    this.state.user.role = role;
    // 不用储存用户身份，因为在router.beforeEach()中，会判断：若未确定身份，则获取用户身份
  },
  clearStateAction () {
    if (this.debug) console.log('clearStateAction triggered');
    this.setUserNameAction('');
    this.setIsLoginAction(false);
    this.setRoleAction('');
  }
}

export default store;