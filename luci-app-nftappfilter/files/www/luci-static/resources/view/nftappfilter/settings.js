'use strict';

// Luci 的 i18n 支持
var callLuci = (path, params, method, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method || 'GET', path, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                var json = JSON.parse(xhr.responseText);
                callback(json);
            } catch(e) {
                callback(null);
            }
        }
    };
    xhr.send(L.urlencode(params || {}));
};

// 重新加载 nftables 规则的函数
function reloadNftRules() {
    callLuci('/cgi-bin/luci/;stok=your_stok_string/rpc/nftappfilter', { 'action': 'reload_rules' }, 'POST', function(response) {
        if (response && response.result) {
            alert('Rules reloaded successfully');
        } else {
            alert('Failed to reload rules');
        }
    });
}

// 页面加载完毕后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    // 绑定重新加载规则按钮的点击事件
    document.getElementById('btnReloadRules').addEventListener('click', reloadNftRules);
});