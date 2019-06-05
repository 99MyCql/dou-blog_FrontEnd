// 自定义的简单状态管理模式，其实就是单例模式
var store = {
  debug: true,
  state: {
    user: {
      userId: 0,
      userName: '',
      isLogin: false,
      role: ''
    }
  },
  setUserIdAction (userId) {
    if (this.debug) console.log('setUserId triggered with', userId);
    this.state.user.userId = userId;
    localStorage.userId = userId;
  },
  setUserNameAction (userName) {
    if (this.debug) console.log('setUserNameAction triggered with', userName);
    this.state.user.userName = userName;
    localStorage.userName = userName;
  },
  setIsLoginAction (isLogin) {
    if (this.debug) console.log('setIsLoginAction triggered with', isLogin);
    this.state.user.isLogin = isLogin;
    localStorage.isLogin = isLogin;
  },
  setRoleAction (role) {
    if (this.debug) console.log('setRoleAction triggered with', role);
    this.state.user.role = role;
  },
  clearStateAction () {
    if (this.debug) console.log('clearStateAction triggered');
    this.state.user.userName = '';
    this.state.user.isLogin = false;
    this.state.user.role = '';
  }
}

export default store;