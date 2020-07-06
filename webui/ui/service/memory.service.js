/**
 * @fileOverview
 *
 * UI 状态的 LocalStorage 的存取文件，未来可能在离线编辑的时候升级
 *
 * @author: zhangbobell
 * @email : zhangbobell@163.com
 *
 * @copyright: Baidu FEX, 2015
 */
angular.module('kityminderEditor').service('memory', function () {
  function isQuotaExceeded(e) {
    var quotaExceeded = false;
    if (e) {
      if (e.code) {
        switch (e.code) {
          case 22:
            quotaExceeded = true;
            break;
          case 1014:
            // Firefox
            if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
              quotaExceeded = true;
            }
            break;
        }
      } else if (e.number === -2147024882) {
        // Internet Explorer 8
        quotaExceeded = true;
      }
    }
    return quotaExceeded;
  }

  return {
    get: function (key) {
      try {
        var value = window.vscode.getState()[key];
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    },

    set: function (key, value) {
      try {
        // window.vscode.setState({[key]: JSON.stringify(value) });
        return true;
      } catch (e) {
        if (isQuotaExceeded(e)) {
          return false;
        }
      }
    },
    remove: function (key) {
      var value = window.vscode.getState()[key];
      // window.vscode.setState({
      //   [key]: null,
      // });
      return value;
    },
    clear: function () {
      // var prevState = window.vscode.getState();
      // for (var key in prevState) {
      //   window.vscode.setState({
      //     [key]: null,
      //   });
      // }
    },
  };
});
