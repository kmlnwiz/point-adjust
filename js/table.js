$(function () {

    const EVENT = {
        data: [
            [...Array(9)].map((element, i) => {
                return i + 1;
            }),
            event_class1['point'],
            event_class2['point'],
            event_class3['point'],
            event_class4['point'],
        ],
        thead: ['順位', 'ポイント'],
    };

    const NORMAL = {
        data: [
            [...Array(9)].map((element, i) => {
                return i + 1;
            }),
            normal_class1['point'],
            normal_class2['point'],
            normal_class3['point'],
            normal_class4['point'],
            normal_class5['point'],
        ],
        thead: ['順位', 'ポイント'],
    };


    //console.log(EVENT, NORMAL);


    function generateTable(data, order) {
        let html = '';
        html +=
            `<table class="table table-hover table-sm align-middle">` +
            `<thead class="">` +
            `<tr class="">`;

        for (let i = 0; i < data['thead'].length; i++) {
            html +=
                `<th class="text-center" scope="col">${data['thead'][i]}</th>`;
        };

        html +=
            `</tr>` +
            `</thead>` +
            `<tbody class="table-group-divider">`;

        for (let i = 0; i < data['data'][order].length; i++) {
            html +=
                `<tr class="${ i + 1 < 9 && i + 1 > 1 ? '':''}">` +
                `<td class="text-center" scope="col">${i + 1 < 9 ? `${i + 1}位` : `9位以下`}</td>` +
                `<td class="text-center" scope="col"><input id="point-custom${order}-${i}" class="form-control form-control-sm text-center" type="number" placeholder="0" aria-label="" min="0" max="99999" value="${data['data'][order][i]}"></td>` +
                `</tr>`;
        };

        html +=
            `</tbody>` +
            `</table>`;

        return html;
    };

    for (let i = 1; i < EVENT['data'].length; i++) {
        $(`#accA-item${i}`).html(generateTable(EVENT, i));
    };
    for (let i = 1; i < NORMAL['data'].length; i++) {
        $(`#accB-item${i}`).html(generateTable(NORMAL, i));
    };

});


function generateResult(result, current) {


    result = result.reduce((acc, cur) => {
        const existing = acc.find((item) => item.name === cur.name && item.point === cur.point && item.rank === cur.rank);
        if (existing) {
            existing.count++;
        } else {
            acc.push({
                ...cur,
                count: 1
            });
        }
        return acc;
    }, []);

    result = result.sort((a, b) => {
        if (a.rank !== b.rank) {
            return a.rank > b.rank ? 1 : -1;
        } else if (a.point !== b.point) {
            return a.point < b.point ? 1 : -1;
        };
    });
    //console.log(result);

    let html = '';
    html +=
        `<table class="table table-hover table-sm align-middle">` +
        `<caption class="d-md-none">横にスクロールできます</caption>` +
        `<thead class="">` +
        `<tr class="">`;

    html +=
        `<th class="text-center" scope="col" style="width: 7.5%;">#</th>` +
        `<th class="text-center" scope="col" style="width: 40.0%; min-width: 15.0em;">トーナメント</th>` +
        `<th class="text-center" scope="col" style="width: 10.0%; min-width: 5.0em;">順位</th>` +
        `<th class="text-center" scope="col" style="width: 10.0%; min-width: 5.0em;">回数</th>` +
        `<th class="text-center" scope="col" style="width: 12.5%; min-width: 5.0em;">ポイント</th>` +
        `<th class="text-center" scope="col" style="width: 20.0%; min-width: 10.0em;">合計ポイント</th>`;

    html +=
        `</tr>` +
        `</thead>` +
        `<tbody class="table-group-divider">`;

    html +=
        `<tr class="table-secondary">` +
        `<td class="text-center" scope="col">0</td>` +
        `<td class="text-center" scope="col">現在のポイント</td>` +
        `<td class="text-center" scope="col">-</td>` +
        `<td class="text-center" scope="col">-</td>` +
        `<td class="text-center" scope="col">${current.toLocaleString()}</td>` +
        `<td class="text-center" scope="col">${current.toLocaleString()}</td>`;
    `</tr>`;

    let sum = current;
    for (let i = 0; i < result.length; i++) {
        sum += result[i]['point'] * result[i]['count'];
        html +=
            (result[i]['name'].includes('イベント') ? `<tr class="table-info">` : `<tr class="">`) +

            `<td class="text-center" scope="col">${i + 1}</td>` +
            `<td class="text-center" scope="col">${result[i]['name']}</td>` +
            `<td class="text-center" scope="col">${result[i]['rank'] >= 9 ? `${result[i]['rank']}位以下` : `${result[i]['rank']}位`}</td>` +
            `<td class="text-center" scope="col">${result[i]['count'].toLocaleString()}</td>` +
            `<td class="text-center" scope="col">${result[i]['point'].toLocaleString()}</td>` +
            `<td class="text-center" scope="col">${sum.toLocaleString()}</td>` +
            `</tr>`;
    };

    html +=
        `</tbody>` +
        `</table>`;

    return html;
};
