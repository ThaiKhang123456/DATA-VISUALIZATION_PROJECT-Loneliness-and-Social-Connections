const data = [
    {country: 'Greece', percentage: 62, year: 2005},
    {country: 'Israel', percentage: 48, year: 2005},
    {country: 'Italy', percentage: 47, year: 2005},
    {country: 'Austria', percentage: 46, year: 2005},
    {country: 'France', percentage: 45, year: 2005},
    {country: 'Belgium', percentage: 42, year: 2005},
    {country: 'Spain', percentage: 40, year: 2005},
    {country: 'Finland', percentage: 39, year: 2002},
    {country: 'Germany', percentage: 37, year: 2005},
    {country: 'Netherlands', percentage: 35, year: 2005},
    {country: 'England', percentage: 33, year: 2018},
    {country: 'United States', percentage: 30, year: 2018},
    {country: 'Sweden', percentage: 30, year: 2005},
    {country: 'Switzerland', percentage: 26, year: 2005},
    {country: 'Denmark', percentage: 25, year: 2005},
];

const colors = {
    'Greece': 'rgb(31, 119, 180)',
    'Israel': 'rgb(255, 127, 14)',
    'Italy': 'rgb(44, 160, 44)',
    'Austria': 'rgb(214, 39, 40)',
    'France': 'rgb(148, 103, 189)',
    'Belgium': 'rgb(140, 86, 75)',
    'Spain': 'rgb(227, 119, 194)',
    'Finland': 'rgb(127, 127, 127)',
    'Germany': 'rgb(188, 189, 34)',
    'Netherlands': 'rgb(23, 190, 207)',
    'England': 'rgb(174, 199, 232)',
    'United States': 'rgb(255, 187, 120)',
    'Sweden': 'rgb(152, 223, 138)',
    'Switzerland': 'rgb(255, 152, 150)',
    'Denmark': 'rgb(197, 176, 213)'
};

function updateChart() {
    const selectedCountries = [];
    document.querySelectorAll('.sidebar input[type="checkbox"]:checked').forEach(checkbox => {
        selectedCountries.push(checkbox.id);
    });

    const filteredData = data.filter(d => selectedCountries.includes(d.country.replace(/\s/g, '')));

    const countries = filteredData.map(d => d.country);
    const percentages = filteredData.map(d => d.percentage);
    const years = filteredData.map(d => `${d.percentage}% in ${d.year}`);

    const trace = {
        x: percentages,
        y: countries,
        text: years,
        textposition: 'outside',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: countries.map(country => colors[country]),
            line: {
                color: 'blue',
                width: 1.5
            }
        }
    };

    const layout = {
        title: 'Self-Reported Loneliness Among Older Adults',
        xaxis: { 
            title: 'Percentage of Self-Reported Loneliness',
            showgrid: false
        },
        yaxis: { 
            automargin: true,
            showgrid: false
        },
        margin: { l: 150, r: 50, t: 50, b: 50 },
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            family: 'Arial, sans-serif',
            size: 14,
            color: 'black'
        }
    };

    Plotly.react('chart', [trace], layout);
}

document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateChart);
});

updateChart();
