event_class1 = {
    name: Array(9).fill('イベントトーナメント 覇級'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    time: [...Array(9)].map((_, i) => 4.50 + (i ** 1.25) / 4, 2),

};

event_class2 = {
    name: Array(9).fill('イベントトーナメント 絶級'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [6000, 4800, 3840, 3072, 0, 0, 0, 0, 812],
    time: [...Array(9)].map((_, i) => 3.50 + (i ** 1.25) / 4, 2),

};

event_class3 = {
    name: Array(9).fill('イベントトーナメント 上級'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [4200, 3360, 2688, 0, 0, 0, 0, 0, 568],
    time: [...Array(9)].map((_, i) => 3.00 + (i ** 1.25) / 4, 2),

};

event_class4 = {
    name: Array(9).fill('イベントトーナメント 中級'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [2500, 2000, 1600, 1280, 1024, 0, 0, 0, 338],
    time: [...Array(9)].map((_, i) => 2.50 + (i ** 1.25) / 4, 2),

};

event_class0 = {
    name: Array(9).fill('イベントトーナメント 覇級（練習）'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    time: event_class1['time']
};

normal_class1 = {
    name: Array(9).fill('慧王【昴】拾式'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [5000, 4000, 3200, 2560, 2048, 0, 0, 0, 662],
    time: [...Array(9)].map((_, i) => 3.50 + (i ** 1.25) / 4, 2),

};

normal_class2 = {
    name: Array(9).fill('叡王【熾】玖式'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [4500, 3600, 2880, 2304, 1844, 1476, 1181, 945, 596],
    time: [...Array(9)].map((_, i) => 3.00 + (i ** 1.25) / 4, 2),

};

normal_class3 = {
    name: Array(9).fill('叡王【沌】捌式'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [4000, 3200, 2560, 2048, 1639, 1312, 1050, 840, 530],
    time: [...Array(9)].map((_, i) => 2.25 + (i ** 1.25) / 4, 2),

};

normal_class4 = {
    name: Array(9).fill('叡王【凌】漆式'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [3500, 2800, 2240, 1792, 1434, 1148, 919, 736, 464],
    time: [...Array(9)].map((_, i) => 2.00 + (i ** 1.25) / 4, 2),

};

normal_class5 = {
    name: Array(9).fill('叡王【虚】陸式'),
    rank: [...Array(9)].map((_, i) => i + 1),
    point: [3000, 2400, 1920, 1536, 1229, 984, 788, 631, 398],
    time: [...Array(9)].map((_, i) => 2.00 + (i ** 1.25) / 4, 2),

};
