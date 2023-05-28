function point_adjust() {

    function findMinCombination(arr, target) {
        const dp = new Array(target + 1).fill(Number.MAX_SAFE_INTEGER);
        dp[0] = 0;
        const choices = new Array(target + 1).fill(-1);
        for (let i = 0; i < arr['point'].length; i++) {
            for (let j = arr['point'][i]; j <= target; j++) {
                if (dp[j - arr['point'][i]] + 1 < dp[j]) {
                    dp[j] = dp[j - arr['point'][i]] + 1;
                    choices[j] = i;
                }
            }
        }
        if (choices[target] === -1) {
            return [];
        }
        const result = [];
        let current = target;
        while (current !== 0) {
            result.push({
                name: arr['name'][choices[current]],
                point: arr['point'][choices[current]],
                rank: arr['rank'][choices[current]],
                time: arr['time'][choices[current]],
            });
            current -= arr['point'][choices[current]];
        }
        return result;
    };


    const target = Number($('#target-point').val());
    const current = Number($('#current-point').val());

    //使用トーナメント設定
    const useEvent = [$('input[id^="event_class"]').map(function () {
        const id = $(this).attr('id');
        return {
            data: window[id],
            onUse: $(this).prop('checked'),
        };
    }).get()]
    useEvent.push(useEvent[0].filter(element => element.onUse).map(element => element.data));

    const useNormal = [$('input[id^="normal_class"]').map(function () {
        const id = $(this).attr('id');
        return {
            data: window[id],
            onUse: $(this).prop('checked'),
        };
    }).get()]
    useNormal.push(useNormal[0].filter(element => element.onUse).map(element => element.data));

    const select = [...useEvent[1], ...useNormal[1]];
    console.log(select);

    //1位と9位以下のみ
    const arr1 = {
        name: select.map(el => [el.name[0], el.name[8]]).flat(),
        point: select.map(el => [el.point[0], el.point[8]]).flat(),
        rank: select.map(el => [el.rank[0], el.rank[8]]).flat(),
        time: select.map(el => [el.time[0], el.time[8]]).flat(),
    };

    //全て
    const arr2 = {
        name: select.map(el => el.name).flat(),
        point: select.map(el => el.point).flat(),
        rank: select.map(el => el.rank).flat(),
        time: select.map(el => el.time).flat(),
    };
    console.log(arr1, arr2);

    let result = findMinCombination(arr1, target - current);
    if (!result.length) {
        result = findMinCombination(arr2, target - current);
    };
    console.log(result)
    $('#result').html(generateResult(result, current));


    function showSelect(arr) {
        let html = '';
        for (let i = 0; i < arr.length; i++) {
            const onUse = arr[i]['onUse'];
            const name = arr[i]['data']['name'][0];

            const icon = onUse ?
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg me-2" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" style="fill: #0d6efd;"></path></svg>` :
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg me-2" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"></path></svg>`;

            html += `<li class="list-group-item"><span class="${onUse ? '' : 'opacity-25'}">${icon}${name}</span></li>`;


        };
        return html;
    };

    function minutesToTime(sec) {
        const marginSeconds = 10;
        const seconds = Math.ceil((sec + marginSeconds) * 60)
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}<span class="small"> 時間 </span>${minutes}<span class="small"> 分</span>`;
    };

    $('#show-current-point').html(`${current.toLocaleString()}<span class="small"> Pt</span>`);
    $('#show-target-point').html(`${target.toLocaleString()}<span class="small"> Pt</span>`);
    $('#show-tournament-count').html(`${result.length.toLocaleString()}<span class="small"> 回</span>`);
    $('#show-tournament-time').html(minutesToTime(result.reduce((acc, cur) => acc + cur['time'], 0)));
    $('#show-select-event').html(showSelect(useEvent[0]));
    $('#show-select-normal').html(showSelect(useNormal[0]));

    const date = new Date();
    $('#generate-date').html(`generated ${date.getFullYear()}/${('00' + (date.getMonth() + 1)).slice(-2)}/${('00' + (date.getDate())).slice(-2)}`);
};


// input要素に対して、値が変更されたときのイベントを設定する
$('input[class^="target-point"]').on('change', function () {
    let value = $(this).val(); // 入力値を取得する

    if (value <= 0) { // 入力値が0以下の場合
        value = 0; // 入力値を0にする
    } else if (String(value).length >= 8) { // 入力値が8桁以上の場合
        value = String(value).slice(0, 8); // 入力値を8桁にする
    };

    if (value > 29999999) { // 入力値が0以上の場合
        value = 29999999; // 入力値を0にする
    };

    $(this).val(value);
    point_adjust();
});

$('input[class^="current-point"]').on('change', function () {
    let value = $(this).val(); // 入力値を取得する

    if (value <= 0) { // 入力値が0以下の場合
        value = 0; // 入力値を0にする
    } else if (String(value).length >= 8) { // 入力値が8桁以上の場合
        value = String(value).slice(0, 8); // 入力値を8桁にする
    };

    if (value > 29999999) { // 入力値が0以上の場合
        value = 29999999; // 入力値を0にする
    };

    $(this).val(value);
    point_adjust();
});

$('.use-select').on('change', point_adjust);


$(document).on('change', '[id^="accA-item"] input', function () {
    let value = Number($(this).val()); // 入力値を取得する

    if (value <= 0 || value == '') { // 入力値が0以下の場合
        value = 0; // 入力値を0にする
    };

    const number = Number($(this).attr('id').slice(-3, -2));
    const index = Number($(this).attr('id').slice(-1));

    window['event_class' + number]['point'][index] = value;

    point_adjust();
});

$(document).on('change', '[id^="accB-item"] input', function () {
    let value = Number($(this).val()); // 入力値を取得する

    if (value <= 0 || value == '') { // 入力値が0以下の場合
        value = 0; // 入力値を0にする
    };

    const number = Number($(this).attr('id').slice(-3, -2));
    const index = Number($(this).attr('id').slice(-1));

    window['normal_class' + number]['point'][index] = value;

    point_adjust();
});


function escapeHtml(str) {
    return str.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
            '\\': '\\'
        } [match];
    });
};

function escapeJs(str) {
    return str.replace(/[\\'"\/\b\f\n\r\t]/g, function (match) {
        return {
            '\\': '\\\\',
            '"': '\\"',
            "'": "\\'",
            '/': '\\/',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t'
        } [match];
    });
};

point_adjust();
