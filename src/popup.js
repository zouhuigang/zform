function css(targetObj, cssObj) {
    var str = targetObj.getAttribute("style") ? targetObj.getAttribute('style') : '';
    for (var i in cssObj) {
        str += i + ':' + cssObj[i] + ';';
    }
    targetObj.style.cssText = str;
}

exports.alert = (data) => {
    var callback = null;
    var alert_bg = document.createElement('div');
    alert_box = document.createElement('div'),
        alert_text = document.createElement('div'),
        alert_btn = document.createElement('div'),
        textNode = document.createTextNode(data ? data : ''),
        btnText = document.createTextNode('确 定');

    // 控制样式
    css(alert_bg, {
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'background-color': 'rgba(0, 0, 0, 0.1)',
        'z-index': '999999999'
    });

    css(alert_box, {
        'width': '270px',
        'max-width': '90%',
        'font-size': '16px',
        'text-align': 'center',
        'background-color': '#fff',
        'border-radius': '15px',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)'
    });

    css(alert_text, {
        'padding': '25px 15px',
        'border-bottom': '1px solid #ddd'
    });

    css(alert_btn, {
        'padding': '15px 0',
        'color': '#007aff',
        'font-weight': '600',
        'cursor': 'pointer'
    });

    // 内部结构套入
    alert_text.appendChild(textNode);
    alert_btn.appendChild(btnText);
    alert_box.appendChild(alert_text);
    alert_box.appendChild(alert_btn);
    alert_bg.appendChild(alert_box);

    // 整体显示到页面内
    document.getElementsByTagName('body')[0].appendChild(alert_bg);
    // 确定绑定点击事件删除标签
    alert_btn.onclick = function () {
        alert_bg.parentNode.removeChild(alert_bg);
        if (typeof callback === 'function') {
            callback(); //回调
        }
    }
}

exports.fullPage = (data) => {
    var callback = null;
    var alert_bg = document.createElement('div');
    alert_box = document.createElement('div'),
        contentHtml = document.createElement('div'),
        close_btn = document.createElement('i');

    // 控制样式
    css(alert_bg, {
        "height": "20%",
        "width": "30%",
        "left": "35%",
        "top": "30%",
        "opacity": "0",
        "z-index": "-100",
        "transition": "all 0.3s ease"
    });

    css(alert_box, {
        'width': '100%',
        'font-size': '16px',
        'text-align': 'center',
        'background-color': '#fff',
        'border-radius': '15px',
        'position': 'absolute'
    });


    css(close_btn, {
        'position': 'fixed',
        'top': '5px',
        'right': '5px',
        'display': 'inline-block',
        'width': '38px',
        'height': '38px',
        'background': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTA0MDc1MjEwNzE5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMjYzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik01MTIuMDkxIDEzOC44ODNjLTI0MS40NzYgMC00MzcuMjIzIDE5NS43NDctNDM3LjIyMyA0MzcuMjEzIDAgMjQxLjQ2MyAxOTUuNzQ3IDQzNy4yMTEgNDM3LjIyMyA0MzcuMjExIDI0MS40ODYgMCA0MzcuMjMzLTE5NS43NDcgNDM3LjIzMy00MzcuMjExIDAtMjQxLjQ2Ni0xOTUuNzQ3LTQzNy4yMTMtNDM3LjIzMy00MzcuMjEzek03NDMuMTggNzc1LjMxMmwtMzEuODY1IDMxLjg2NUw1MTIuMDk2IDYwNy45NiAzMTIuODc4IDgwNy4xNzdsLTMxLjg2NC0zMS44NjMgMTk5LjIxOC0xOTkuMjE4LTE5OS4yMTktMTk5LjIxOSAzMS44NjQtMzEuODY1IDE5OS4yMTkgMTk5LjIxOSAxOTkuMjE5LTE5OS4yMTkgMzEuODY1IDMxLjg2NS0xOTkuMjE5IDE5OS4yMTlMNzQzLjE4IDc3NS4zMTJ6IiBmaWxsPSIjNTE1MTUxIiBwLWlkPSIxMDI2NCI+PC9wYXRoPjwvc3ZnPg==) no-repeat center center',
        'background-size': 'contain',
    });
    // 内部结构套入
    contentHtml.innerHTML = data ? data : '';
    alert_box.appendChild(contentHtml);
    alert_box.appendChild(close_btn);
    alert_bg.appendChild(alert_box);

    // 整体显示到页面内
    document.getElementsByTagName('body')[0].appendChild(alert_bg);

    setTimeout(function () {
        css(alert_bg, {
            'position': 'fixed',
            'height': '100%',
            'width': '100%',
            'left': '0px',
            'top': '0px',
            'opacity': 1,
            'z-index': 999,
            'overflow': 'auto',
            "transition": "all 0.8s ease"
        });
    }, 30);

    // 确定绑定点击事件删除标签
    close_btn.onclick = function () {
        css(alert_bg, {
            "height": "20%",
            "width": "30%",
            "left": "35%",
            "top": "30%",
            "opacity": "0",
            "z-index": "-100",
            "transition": "all 0.3s ease"
        });
        setTimeout(function () {
            alert_bg.parentNode.removeChild(alert_bg);
            if (typeof callback === 'function') {
                callback(); //回调
            }
        }, 500);

    }
}
