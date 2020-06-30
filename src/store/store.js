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
    sessionStorage.userName = userName; // 储存到本地缓存中
  },
  setIsLoginAction (isLogin) {
    if (isLogin === 'false') isLogin = false;
    else if (isLogin === 'true') isLogin = true;
    if (this.debug) console.log('setIsLoginAction triggered with', isLogin);
    this.state.user.isLogin = Boolean(isLogin);
    sessionStorage.isLogin = Boolean(isLogin); // 储存到本地缓存中
  },
  setRoleAction (role) {
    if (this.debug) console.log('setRoleAction triggered with', role);
    this.state.user.role = role;
    sessionStorage.role = role;
  },
  clearStateAction () {
    if (this.debug) console.log('clearStateAction triggered');
    this.setUserNameAction('');
    this.setIsLoginAction(false);
    this.setRoleAction('');
  }
}

export default store;