window.addEventListener('DOMContentLoaded', () => {
  const getPreview = function () {
    document.querySelector('#uploader').addEventListener('change', (event) => {
      const file = event.target.files[0]

      // fileがundefinedの時にreader.readAsDataURL(file)がエラーになるため、
      // !fileがfalseの場合にreturnする。
      if (!file) return

      const reader = new FileReader()

      reader.onload = (event) => {
        document.querySelector('#preview').src = event.target.result;
      }
      reader.readAsDataURL(file)
    })
  };
  getPreview();
  

  // ボタンで結果の切り替えを行う
  const so = document.getElementById('Switch_o')
  const ss = document.getElementById('Switch_s')
  const Objectdata = document.getElementById('objectdata');
  const SafeSearch = document.getElementById('safesearch');


  ss.addEventListener('click', () => {
    Objectdata.className = 'result objectdata hidden';
    SafeSearch.className = 'result safesearch show';
    const result = document.getElementById("result");

    
    
    // APIアクセス準備
    const urlkey = `https://vision.googleapis.com/v1/images:annotate?key=${window.globalConstant.hoge}`;
    const uploader = document.getElementById('uploader').src;
  
  
    // XMLHttpRequestオブジェクトの作成
    var request = new XMLHttpRequest();
  
    const end = document.getElementById('preview').src.indexOf(',');
    // base64文字列の不要な前半(,以前を削除
    const imgurl = document.querySelector('#preview').src.slice(end + 1);
  
  
    const postbody = {
      "requests": [
        {
          "image": {
            "content": imgurl
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults": 1
            },
            {
              "type": "SAFE_SEARCH_DETECTION",
              "maxResults": 5
            }
          ]
        }
      ]
    }
  
    // URLを開く
    request.open('POST', urlkey, true);
    request.setRequestHeader('content-type', 'application/json; charset=utf-8');
  
  
  
    // 通信状態に対応したDOM操作
    // レスポンス送受信中
    request.addEventListener('loadatart', () => {
      result.textContent = '通信中';
    });
    // レスポンスが返ってきた時の処理
    request.addEventListener('load', () => {
      var data = request.response;
      const parsed = JSON.parse(data);
      const labelAnnotations = parsed.responses[0].labelAnnotations[0];
      const safeSearchAnnotations = parsed.responses[0].safeSearchAnnotation;
      console.log(safeSearchAnnotations);
  
  
      if ('content' in document.createElement('template')) {
        // labelAnnotaionsの方
        const tbody = document.createElement('tbody');
        const template = document.querySelector('#whatisgot');
        const table = document.querySelector('table');
        
        // 新しい行を複製して表に挿入
        for (i=0; i<4; i++) {
          var clone = template.content.cloneNode(true);
          // var td = clone.querySelectorAll("td");
          const td_property = clone.querySelector(".property_name");
          const td_value = clone.querySelector(".value_name");
          const key = Object.keys(labelAnnotations);
          const value = Object.values(labelAnnotations);
          const tr = clone.querySelector('tr');
          td_property.textContent += key[i];
          td_value.textContent += value[i];
          tbody.appendChild(clone);
        };
          
        // 既存のtableに挿入
        if (table.childElementCount == 2) {
          table.removeChild(tbody);
          table.appendChild(tbody);
          } else {
            table.appendChild(tbody);
            };
  
        
        // safeSearchの方
        const tbody2 = document.querySelector('.table_safe > tbody');
        const template2 = document.querySelector('#safesearch_table');
      // 新しい行を複製して表に挿入します。
      for (i=0; i<5; i++) {
        var clone2 = template2.content.cloneNode(true);
        const td_category = clone2.querySelector(".category_name");
        const meter = clone2.querySelector("#safe_meter");
        // const td_rate = clone2.querySelector(".safe_rate");
        const key2 = Object.keys(safeSearchAnnotations);
        const value2 = Object.values(safeSearchAnnotations);
        const levels = {VERY_UNLIKELY:0, UNLIKELY:1, POSSIBLE:2, LIKELY:3, VERY_LIKELY:4};
        const level_key = Object.keys(levels);
        const level_value = Object.values(levels);
        const tr = clone2.querySelector('tr');
        meter.value = levels[value2[i]];
        td_category.textContent += key2[i];
        tr.appendChild(meter);
        
        // 既存のtbodyに挿入する
        tbody2.appendChild(clone2);
    };
      } else {
        console.log('contentがありません');
      };
  
    }, { once: true});
    // 通信失敗
    request.addEventListener('error', () => {
      result.textContent = 'サーバーエラーが発生しました';
    });
  
    // リクエストをURLに送信
    request.send(JSON.stringify(postbody));
  });

  so.addEventListener('click', () => {
    Objectdata.className = 'result objectdata show';
    SafeSearch.className = 'result safesearch hidden';

    const result = document.getElementById("result");

    // APIアクセス準備
    const urlkey = `https://vision.googleapis.com/v1/images:annotate?key=${window.globalConstant.hoge}`;
    console.log(urlkey)

    const uploader = document.getElementById('uploader').src;


    // XMLHttpRequestオブジェクトの作成
    var request = new XMLHttpRequest();

    const end = document.getElementById('preview').src.indexOf(',');
    // base64文字列の不要な前半(,以前を削除
    const imgurl = document.querySelector('#preview').src.slice(end + 1);


    const postbody = {
      "requests": [
        {
          "image": {
            "content": imgurl
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults": 1
            },
            {
              "type": "SAFE_SEARCH_DETECTION",
              "maxResults": 5
            }
          ]
        }
      ]
    }

    // URLを開く
    request.open('POST', urlkey, true);
    request.setRequestHeader('content-type', 'application/json; charset=utf-8');



    // 通信状態に対応したDOM操作
    // レスポンス送受信中
    request.addEventListener('loadatart', () => {
      result.textContent = '通信中';
    });
    // レスポンスが返ってきた時の処理
    request.addEventListener('load', () => {
      var data = request.response;
      const parsed = JSON.parse(data);
      const labelAnnotations = parsed.responses[0].labelAnnotations[0];
      const safeSearchAnnotations = parsed.responses[0].safeSearchAnnotation;
      console.log(safeSearchAnnotations);


      if ('content' in document.createElement('template')) {
        // labelAnnotaionsの方
        const tbody = document.createElement('tbody');
        const template = document.querySelector('#whatisgot');
        const table = document.querySelector('table');
        
        // 新しい行を複製して表に挿入
        for (i=0; i<4; i++) {
          var clone = template.content.cloneNode(true);
          const td_property = clone.querySelector(".property_name");
          const td_value = clone.querySelector(".value_name");
          const key = Object.keys(labelAnnotations);
          const value = Object.values(labelAnnotations);
          const tr = clone.querySelector('tr');
          td_property.textContent += key[i];
          td_value.textContent += value[i];
          tbody.appendChild(clone);
        };
          
        // 既存のtableに挿入
        if (table.childElementCount == 2) {
          table.removeChild(tbody);
          table.appendChild(tbody);
          } else {
            table.appendChild(tbody);
            };
  
        
        // safeSearchの方
        const tbody2 = document.querySelector('.table_safe > tbody');
        const template2 = document.querySelector('#safesearch_table');
      // 新しい行を複製して表に挿入します。
      for (i=0; i<5; i++) {
        var clone2 = template2.content.cloneNode(true);
        const td_category = clone2.querySelector(".category_name");
        const meter = clone2.querySelector("#safe_meter");
        // const td_rate = clone2.querySelector(".safe_rate");
        const key2 = Object.keys(safeSearchAnnotations);
        const value2 = Object.values(safeSearchAnnotations);
        const levels = {VERY_UNLIKELY:0, UNLIKELY:1, POSSIBLE:2, LIKELY:3, VERY_LIKELY:4};
        const level_key = Object.keys(levels);
        const level_value = Object.values(levels);
        const tr = clone2.querySelector('tr');
        meter.value = levels[value2[i]];
        td_category.textContent += key2[i];
        tr.appendChild(meter);
        
        // 既存のtbodyに挿入する
        tbody2.appendChild(clone2);
    };
      } else {
        console.log('contentがありません');
      };

    }, { once: true});
    // 通信失敗
    request.addEventListener('error', () => {
      result.textContent = 'サーバーエラーが発生しました';
    });

    // リクエストをURLに送信
    request.send(JSON.stringify(postbody));
  });
});

