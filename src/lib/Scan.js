import Constants from "expo-constants";

/**
 * CloudVisionに画像データを送信し、解析結果を得る
 */
export const getCVRes = async (image) => {
    const startTime = Date.now();
    const body = JSON.stringify({
        requests: [
        {
            features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 1 }],
            imageContext: {
                languageHints: ["ja-t-i0-handwrit"]
            },
            image: {
                content: image
            }
        }
        ]
    });
    const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_CLOUD_VISION_API_KEY}`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: body
        }
    )

    let resJson = await response.json();
    let data = await resJson.responses[0].textAnnotations;
    return data;
}

/**
 * JSONオブジェクトから必要な情報をマッピングする
 */
export const mapJsonObject = (data) => {
    let mapData = data
        .filter((d, i) => i !== 0) // APIレスポンスの0番目の要素は形式が違うので除外する。
        .map(d => ({
            text: d.description,
            posX: Number(d.boundingPoly.vertices[0].y),
            posY: Number(d.boundingPoly.vertices[0].x)
        }))
        .sort((a, b) => 
            a.posY < b.posY ? -1 : a.posY > b.posY ? 1 : 0); // Yの昇順
    return mapData;
}

/**
 * 高さが近いデータを集めて行別データにする 
 */
export const convertRowData = (mapData) => {
    let convertData = [];
    let tmpData = [];
    for(let i in mapData) {
        if(Number(i) === 0) {
            // 配列の最初の要素の場合は「tmpData」にPUSHする
            tmpData.push(mapData[i]);
            continue;
        }
        // 隣り合わせの要素と20px以上開きがあるかどうか
        if(mapData[i].posY - mapData[i-1].posY <= 20) {
            // ない場合は現在行の「tempData」に値を追加する 
            tmpData.push(mapData[i]);
        } else {
            // 距離に開きがある場合は別の行と判断し、一つ前までの「tmpData」をconvertDataに移す
            convertData.push(tmpData);
            //「tmpData」を初期化
            tmpData = [];
            // 新しい「tmpData」にデータを追加
            tmpData.push(mapData[i]);
        }
        if(i === Number(mapData.length)) {
            // 一番最後の要素の場合は残りを「convertData」にPUSHする
            convertData.push(tmpData);
        }
    }

    return convertData;
}

/**
 * 1行ごとにまとめたデータを左座標から順に並び替えて文字列結合する
 */
export const sortFromLeftAndJoinStr = (convertData) => {
    for(let i in convertData) {
        convertData[i] = convertData[i]
        .sort((a, b) => 
            a.posX < b.posX ? 1 : a.posX > b.posX ? -1 : 0) // Xの昇順
        .map(cd => {
            if(cd.text === '半') { // 「¥」が「半」で撮れてしまうケースが多いため
                return '¥';
            } else {
                return cd.text;
            }
        })
        .join('');
    }
    return convertData;
}

/**
 * JSONオブジェクトをCSVに変換
 */
export const convertToCSV = (objArray) => {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var headerLine = '商品, 値段(円)';
    str += headerLine + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

/**
 * [品物：値段]の形式のリストオブジェクトを作成する。
 */
export const createPriceObject = (convertData) => {
    let result = [];
    let now = 1;
    for(let i in convertData) {
        if(!convertData[i].includes('¥')) continue;
        // 1行の文字列を「¥」でセパレートする
        result.push(convertData[i].split('¥'));
        // 現在のイテレータの数字を取得
        let max = Number(result.length) - 1;
        // [¥]より前の値の取得に失敗していた場合は固定文言を表示
        result[max][0] = result[max][0] !== '' ? result[max][0] : '読み取り失敗'; 
        // [¥]より後ろの数値以外の値を除去
        result[max][1] = result[max][1].replace(/[^0-9]/g, '');
        // 一意のIDを付与する
        result[max][2] = now++;
    }
    return result;
}
