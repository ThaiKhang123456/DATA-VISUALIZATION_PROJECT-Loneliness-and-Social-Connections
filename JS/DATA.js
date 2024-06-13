d3.csv("../DATA/one-person-households.csv").then(function(data) {
    //mảng entity
    const data1 = data;

    // Data array 2 - Entity column with default false checkboxes
    const data2 = data.map(d => ({
    entity: d.Entity,
    checked: false
    }));

    // Data array 3 - Checkboxes with status true
    const data3 = data2.filter(d => d.checked);

    // Data array 4 - Checkboxes with status false
    const data4 = data2.filter(d => !d.checked);

    // Data array 5 - Data from data1 where entity is in data3
    const data5 = data1.filter(d => data3.some(e => e.entity === d.Entity));
    
    
})