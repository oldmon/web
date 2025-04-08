// 數據轉換函數
function transformData(rawData) {
    return rawData.map(event => ({
        date: new Date(event.startDate),
        type: event.category,
        title: event.title,
        location: event.location,
        total: 1 // 用於統計
    }));
}

// 數據聚合函數
function aggregateData(data, timeRange) {
    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - timeRange));
    
    return d3.rollup(
        data.filter(d => d.date >= startDate),
        v => ({
            講座: v.filter(d => d.type === "講座").length,
            展覽: v.filter(d => d.type === "展覽").length,
            表演: v.filter(d => d.type === "表演").length,
            其他: v.filter(d => d.type === "其他").length,
            total: v.length
        }),
        d => d3.timeDay(d.date)
    );
}
