// ==UserScript==
// @name         yt_inf_to_obs
// @namespace    https://www.youtube.com/watch?*
// @version      1.0
// @description  Inserts "[規制済み]" into elements with the class "[名前]"
// @author       suke
// @match        https://www.youtube.com/watch?*
// @grant        none// ==UserScript==
// @name         YOUTUBE CAPTURE
// @namespace    https://www.youtube.com/watch?*
// @version      1.0
// @description  Inserts "[規制済み]" into elements with the class "[名前]"
// @author       suke
// @match        https://www.youtube.com/watch?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    /**
     * クラス名からそこに存在するテキストを書き出す関数
     * @param {string} classname 取得したいクラスのクラス名
     * @returns そのクラスに存在するテキスト
     */
    function getstring(classname) {
        // エレメントを取得
        const elements = document.getElementsByClassName(classname);
        // 最初のエレメントからテキストを取得
        if (elements.length > 0) {
            const text = elements[0].innerText;
            //console.log(text);
            return (text)
        } else {
            //  console.log("指定されたエレメントが見つかりませんでした。");
            return (false)
        }
    };
    function parsetext(inputText) {
        if (inputText === false) {
            return false
        }
        // 改行(\n)を区切りに配列に分解
        const lines = inputText.split('\n');

        // パースされた結果を格納するためのオブジェクト
        const obj = {};

        // 配列をループしてパース
        let currentIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]


            obj[currentIndex] = line; // パース結果をオブジェクトに格納
            currentIndex++;
        }

        // console.log("---")
        //console.log(obj)
        //console.log("---")
        if (obj[0] === ''){
        return false;
        };
        let is視聴 = null;
       // console.log("ああ")
        for (let index = 6; index < 999999; index++) {
           //   console.log("いい")
            if (obj[index].indexOf('視聴') !== -1) {

       //         console.log(index)
                is視聴 = obj[index]
            //    console.log(is視聴)
                break;
            }

        }
        const retuenobj = {
            タイトル: obj[0],
            チャンネル名: obj[1],
            登録者: obj[2],
            視聴: is視聴,
        }
        return retuenobj;
    };

    function sendws(elements) {
        // WebSocketへの接続
        const socket = new WebSocket('ws://localhost:29453');
        socket.onopen = () => {
            console.log('WebSocketに接続しました。');
            socket.send(JSON.stringify(elements));

            socket.close();
        };
        socket.onerror = (error) => {
            console.error('WebSocketエラー:', error);
        };
    };
    function main() {
        let isfast = null;
        setInterval(() => {
            const elements = parsetext(getstring("style-scope ytd-watch-metadata"));
            if (elements !== false) {
                if (elements.タイトル !== isfast) {
                    //console.log("------")
                  //  console.log(isfast)
                    //console.log(elements.タイトル)
                    //console.log("------")
                    //console.log(isfast)
                    sendws(elements);
                    isfast = elements.タイトル
                }
            }
        }, 100);
    };

    window.addEventListener('load', () => {
        main();
    });
})();



// ==/UserScript==

(function () {
    'use strict';
    /**
     * クラス名からそこに存在するテキストを書き出す関数
     * @param {string} classname 取得したいクラスのクラス名
     * @returns そのクラスに存在するテキスト
     */
    function getstring(classname) {
        // エレメントを取得
        const elements = document.getElementsByClassName(classname);
        // 最初のエレメントからテキストを取得
        if (elements.length > 0) {
            const text = elements[0].innerText;
            //console.log(text);
            return (text)
        } else {
            //  console.log("指定されたエレメントが見つかりませんでした。");
            return (false)
        }
    };
    function parsetext(inputText) {
        if (inputText === false) {
            return false
        }
        // 改行(\n)を区切りに配列に分解
        const lines = inputText.split('\n');

        // パースされた結果を格納するためのオブジェクト
        const obj = {};

        // 配列をループしてパース
        let currentIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]


            obj[currentIndex] = line; // パース結果をオブジェクトに格納
            currentIndex++;
        }

        // console.log("---")
        //console.log(obj)
        //console.log("---")
        if (obj[0] === ''){
        return false;
        };
        let is視聴 = null;
       // console.log("ああ")
        for (let index = 6; index < 999999; index++) {
           //   console.log("いい")
            if (obj[index].indexOf('視聴') !== -1) {

       //         console.log(index)
                is視聴 = obj[index]
            //    console.log(is視聴)
                break;
            }

        }
        const retuenobj = {
            タイトル: obj[0],
            チャンネル名: obj[1],
            登録者: obj[2],
            視聴: is視聴,
        }
        return retuenobj;
    };

    function sendws(elements) {
        // WebSocketへの接続
        const socket = new WebSocket('ws://localhost:29453');
        socket.onopen = () => {
            console.log('WebSocketに接続しました。');
            socket.send(JSON.stringify(elements));

            socket.close();
        };
        socket.onerror = (error) => {
            console.error('WebSocketエラー:', error);
        };
    };
    function main() {
        let isfast = null;
        setInterval(() => {
            const elements = parsetext(getstring("style-scope ytd-watch-metadata"));
            if (elements !== false) {
                if (elements.タイトル !== isfast) {
                    //console.log("------")
                  //  console.log(isfast)
                    //console.log(elements.タイトル)
                    //console.log("------")
                    //console.log(isfast)
                    sendws(elements);
                    isfast = elements.タイトル
                }
            }
        }, 100);
    };

    window.addEventListener('load', () => {
        main();
    });
})();


